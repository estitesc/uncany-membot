import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import talkAboutPersonalMemory from "../resp/talkAboutPersonalMemory";

const TalkAboutMemories: ProgramNode = (threadProps: ThreadProps) => {
  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: talkAboutPersonalMemory,
      gptConfig: {
        temperature: 0.9,
        max_tokens: 100,
        stop: "HUMAN",
      },
      completionHandler: handleStoreReply,
      dataConfig: {
        getPersonalDialogMatches: true,
      },
    };

    await runLangNode(dialogResponder);
  };
};

export default TalkAboutMemories;
