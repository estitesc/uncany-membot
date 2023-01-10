# uncany-membot
Boilerplate chatbot with the ability to store memories for long context, deploy over SMS or webGUI

# Basic Long Memory for Chatbots

In this repo, built on the uncany JS framework, same boilerplate as the uncany-formbot, you can see a basic example of how to use embeddings on a dialog line level and then leverage them to bring relevant context into the final responder prompt allowing the bot to recall context from previous conversations, other conversations, or just earlier in the same conversation.

This dialog-to-dialog memory approach doesn't require any summarization or the building out of an entity-based knowledge graph. It runs an O(n) search across all previous lines of dialog syncronously before responding which could be a performance / latency issue. It also adds an embedding API call into the pre-response chain, again bringing some latency. 

Hence this approach results in responses with a noticeable increase in latency compared to the uncany-formbot, yet it unlocks a powerful general-purpose context building that would be useful for situations where you want a bot to learn over time.

# Embeddings Overview

Before I explain the membot algorithm, I am going to quickly go over how embeddings work as we're using them as the foundation of our search system. You could theoretically use other methods like elastic search however I think embeddings are well suited for this case.

An embedding is basically a n-dimensional vector represented as an array of floats that captures the semantic quality of an input, in this case the input is a string. N is large, >1000. 

The way in which the embedding can be said to capture the semantic quality of an input is that if you run a cosin-similarity between two embeddings, the result will indicate similarity and connection between the two. 

This is probably not the most technically accurate description of embeddings but it's how I understand and use them for these language cases. 

(You can read more about OpenAI embeddings here)[https://beta.openai.com/docs/guides/embeddings/what-are-embeddings]

# Capturing Embeddings

As a first step to building the membot, you need to embed every line of dialog that goes into the conversation thread. Basically, every time that the user sends a message either through the webGUI or SMS, you pass the body of that message to the Ada embeddings API and record the response. I'm doing triggering it in my `model/threadData.ts` and the code that handles the storage of the embedding is between `lib/embedApiCaller.ts` and `api/storePersonalMessageEmbedding.ts`.

I've chosen here to capture embeddings for both the user's messages and the AI's responses. However, you could limit to just the AI's responses.

I'm storing the embeddings in two places, in a master messages list where I can scan across all embeddings, as well as on the message's canonical entry in the firestore which exists in `users/threads/messages/[messageId]`. 

In the master messages list I'm recording `userId`, `threadId`, `messageId` so that I can look up the canonical message. 

Importantly, I've also specified incremental integer ID's for the messageId within a thread. The incrementation spans both the `messages` and `replies` hence if you have a match on a target ID, you can easily expand to the several messages/replies before and after that message. This ends up allowing us look up the proximal dialog lines without needing to use a timestamp sort to determine proximity / ordering. 

# Choosing Dialog Line Level

When generating + storing embeddings we have a choice of what level we want to embed. We could choose to embed each sentence, each word, even each token, or we could embed at a higher level - blocks of dialog, or summaries of information extracted from the dialog. 

My hypothesis in the membot experiment is that summarization approaches are unnecessary and counterproductive for this use case. The reason is that if you summarize, you have created a large block text whose form factor varies greatly from the dialog line queries that will the similarity search will ultimately be running against. 

As an example, you could have a summary like:

`The AI and the human are still sitting at the cafe outdoor. There are various people sitting around. It's a cool breezy day and the AI is wearing a long black coat and a hat. They are speaking in English and the AI is asking the human more about his project, Squidbots. The human tells the AI that they have a demo Squidbot deployed in the backyard swimming pool at his in-law's house and people seem to enjoy it, though most of them haven't upgraded`

Then the next line of dialog comes in as:

`I'm still not sure if I'm working on the right thing...`

If you had many summaries of the above sort, and you were trying to figure out which one to load into context to give a good reply to this user dialog, you'd certainly want to include the summary of Squidbots. 

However, the similarity before the string `I'm still not sure if I'm working on the right thing...` and the entire block of dialog above is not going to be super high since they are just very different forms of text. 

So you might imagine, breaking the summary down into sentences or smaller shards, and possibly doing the same to the input dialog could help trigger the match. This well help, but that expansion also creates more possibilities for random hits and requires more syncronous calls to the embeddings API which increases latency.

But if you look at the lines of conversation that yielded the summary in the first place, they might be something like:

```
AI: What's going on in your life right now?
HUMAN: I'm spending a lot of time working on my project.
AI: What's project are you working on?
HUMAN: Oh it's this thing called squidbot.
AI: What does it do?
HUMAN: Well, it actually is a little squid robot, I have a demo version running at my in-law's house since they have a pool. 
```

Any one of these lines would be much more likely to trigger a similarity search hit for the embedding on `I'm still not sure if I'm working on the right thing...`. Then the key is simply to expand N lines of dialog in either direction around that match, so that all of the relevant conversational context gets pulled in.

Doing so you skip the summarization step, which may result in larger context buffers that take up more tokens in your final responder prompt, but gives the LLM what it needs to intelligently handle scenarios that remind it of previous conversations. 

# Searching Embeddings

Now that we've learned how to store embeddings, and the rational for storing them at a dialog line level, let's go into the mechanics of finding matches when we are trying to generate the next response. 

The first thing you need to do is call the embeddings API for the most recent line of dialog. We are doing that anyway to store the embedding for future look ups, but this just means that we need to do it syncronously (before a reply is generated) and can't do it after the fact in an async process.

So it's pretty simple, get the embedding, then compare it across ALL previous dialog line embeddings. Comparing a pair of embeddings uses this simplified cosine distance function:

```
export const cosineSimilarity = (a: number[], b: number[]) => {
  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }
  return dotProduct;
};
```

Feel free to take a look at the Open AI docs which explain that in the case of ADA embeddings, dot product is a sufficient stand in for full cosine similarity.

I then look at the highest values, and consider them matches if they surpass a certain threshold. I'm using 0.8 as a threshold here for the cosine distance. 

I'm picking the top 3 matches given they surpass the threshold, which is a constant you could play with depending on how you want to calibrate for your use case.

# Building the Relevance Buffer

After finding the matching dialog lines, we use look at the 3 lines of dialog before and after and load the resulting block of dialog as a string into a relevance buffer, which will contain up to 10 entries. New entries push older ones from the bottom, FIFO, not based on relative similarity scores.

Building out the 3 lines surrounding the matching line is handled in `lib/memory.ts`.

The purpose of this buffer is to keep relevant dialog matches in context even over the course of several lines of dialog beyond when the match was triggered. All of these examples end up being loaded into the final responder like this:

`
The AI has a conversation with the HUMAN. If the AI doesn't know the answer to a question, it can respond by saying it does not know.

  Here are PREVIOUS CONVERSATIONS that the HUMAN had with the AI:

  ${renderDialogBlocks}

  Here is the current conversation:

  ${dialog}
  AI: 
`

I have experimented with more complex prompting such as "The AI can reference events from the PREVIOUS CONVERSATIONS" however, it does a pretty good job of this without extra prompting and adding more color to the prefix can end up rubbing off too strongly onto the final response.

# Beyond Simple Memory

I've shown how you can use embeddings to search for relevant conversation history and give the bot context to remember what a user said to it in the past. It works pretty well especially in the cases of any direct questions that you ask where the answer would be somewhere in the history. 

You could do more interesting things with this. For example, you could build a bot that remembers it's conversations with other users. That dramatically increases the number of embeddings that you would need to run a similarity search on, and hence you might need to consider some trees, sampling, or other search structures to traverse in a more efficient way.


