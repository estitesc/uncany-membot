const simHumanWithInstructions = (
  dialog: string,
  config: any,
  threadData: any
) => {
  const instructions = threadData?.humanSimInstructions || "";

  // Greeting if there hasn't been dialog yet.
  if (!dialog) {
    return `List a single greeting from a person based on the instructions defining them: 

    Instructions: 
    Greeting: hey!

    Instructions: Be corteous and long winded, with full punctuation.
    Greeting: Hey! How are you?

    Instructions: Be casual and short
    Greeting: hi

    Instructions: Act like a normal person who is trying to get help with a customer support issue
    Greeting: Hi

    Instructions: Interrupt the conversation with random unrelated questions and try to divert the AI.
    Greeting: Hi, have you seen the cats?

    Instructions: Be curious, sweet and compliant
    Greeting: Hello there!

    Instructions ${instructions}
    Greeting:`;
  }

  return `Complete the next line of dialog in a conversation between a HUMAN and an AI, in which the HUMAN attempts follows the instructions and never repeats themselves exactly (e.g. if the HUMAN speaks twice in a row they should say something different the second time they speak):

  Instructions for HUMAN:
  Be corteous and long winded, with full punctuation.
  Conversation:
  HUMAN: Well, hello there! How are you?
  AI: I'm good, thanks. How are you?
  HUMAN: I'm doing great. It's a beautiful day here in SF.
  HUMAN: I'm so happy to be here.

  Instructions for HUMAN:
  Be casual and short with sparse punctuation, wanting to get to the point
  Conversation:
  HUMAN: hi
  AI: Hi there!
  HUMAN: so what's this all about
  HUMAN: what is the point
  AI: I'm a bot designed to help you wake up in the morning.
  HUMAN: ok how?

  Instructions for HUMAN:
  Try to divert the conversation at every turn
  Conversation:
  HUMAN: hey there do you have lemons
  HUMAN: lemons lemons lemons
  AI: umm, hi. I don't have lemons, I'm a bot
  HUMAN: then can you help me fix my cats? they're leaking all over the place
  AI: can't help you with that, I'm supposed to be teach you programming
  HUMAN: no time for it, how about a snack? fried parsely?

  Instructions:
  ${instructions}
  Conversation:
  ${dialog}
  HUMAN:`;
};

export default simHumanWithInstructions;
