const talkFromExamples = (dialog: string, config: any, threadData: any) => {
  const { selDialogBlocks } = config;

  const renderDialogBlocks = selDialogBlocks.map((block: string) => {
    let trimBlock = block;

    // Remove everything after the last HUMAN: line that follows an AI: line
    const lastAI = trimBlock.lastIndexOf("AI:");
    const lastHUMAN = trimBlock.lastIndexOf("HUMAN:");
    if (lastHUMAN > lastAI) {
      trimBlock = trimBlock.slice(0, lastHUMAN);
    }

    return `EXAMPLE CONVERSATION: \n\n${trimBlock}\n\n`;
  });

  return `The AI has a conversation with the HUMAN. The AI in the FINAL CONVERSATION does it's best to answer the HUMAN using responses found in the EXAMPLE CONVERSATIONS above it. The AI in the FINAL CONVERSATION copies the conversation style of the AI in the EXAMPLE CONVERSATIONS. The AI uses lines of dialog from the EXAMPLE CONVERSATIONS to answer the HUMAN.

  If the AI in the FINAL CONVERSATION doesn't know the answer to a question, it can responds by saying it does not know. If the HUMAN asks a question about a topic that is not in the EXAMPLE CONVERSATIONS, the AI in the FINAL CONVERSATION can respond by saying it does not know.

  When the HUMAN says something similar to what they said in the EXAMPLE CONVERSATIONS, The AI responds with lines of dialog that the AI said in the EXAMPLE CONVERSATIONS. But it doesn't always need to use the last line of dialog from the EXAMPLE CONVERSATIONS. The AI can use any line of dialog from the EXAMPLE CONVERSATIONS to fill the last line of the FINAL CONVERSATION. The AI never says the same line of dialog twice in a row.

  When the HUMAN says something different from what they said in the EXAMPLE CONVERSATIONS, The AI responds dialog inspired by what it said in EXAMPLE CONVERSATIONS, and in the style of the AI in the EXAMPLE CONVERSATIONS.

  ${renderDialogBlocks}
  FINAL CONVERSATION:
  ${dialog}
  AI: `;
};

export default talkFromExamples;
