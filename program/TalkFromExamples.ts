import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import talkFromExamples from "../resp/talkFromExamples";

const TalkFromExamples: ProgramNode = (threadProps: ThreadProps) => {
  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: talkFromExamples,
      gptConfig: {
        temperature: 0.7,
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

export default TalkFromExamples;
