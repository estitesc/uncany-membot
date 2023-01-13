import SimulateHuman from "./SimulateHuman";
import TalkFromExamples from "./TalkFromExamples";

const Root: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Root");

  return async () => {
    if (threadProps.threadData.convoState === "SIM_HUMAN") {
      await SimulateHuman(threadProps)();
    } else {
      await TalkFromExamples(threadProps)();
      return;
    }
  };
};

export default Root;
