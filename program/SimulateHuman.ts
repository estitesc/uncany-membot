import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import simHumanWithInstructions from "../resp/simHumanWithInstructions";

const SimulateHuman: ProgramNode = (threadProps: ThreadProps) => {
  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      dialogConfig: { flipDialog: true },
      promptTemplate: simHumanWithInstructions,
      gptConfig: {
        temperature: 0.7,
        max_tokens: 100,
        stop: "AI",
      },
      completionHandler: handleStoreReply,
    };

    await runLangNode(dialogResponder);
  };
};

export default SimulateHuman;
