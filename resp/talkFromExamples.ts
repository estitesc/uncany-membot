const talkFromExamples = (dialog: string, config: any, threadData: any) => {
  const { selDialogBlocks } = config;

  const renderDialogBlocks = selDialogBlocks.map((block: string) => {
    return `EXAMPLE: \n\n${block}\n\n`;
  });

  return `The AI has a conversation with the HUMAN. In each Example, the AI does it's best to follow the patterns of conversations that it had in previous examples. The AI has consistent conversations that mimic the style and flow that it had in previous examples. If the AI doesn't know the answer to a question, it can respond by saying it does not know. 

  ${renderDialogBlocks}
  EXAMPLE:
  ${dialog}
  AI: `;
};

export default talkFromExamples;
