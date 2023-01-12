import SimulateHuman from "./SimulateHuman";
import TalkAboutMemories from "./TalkAboutMemories";

const Root: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Root");

  return async () => {
    if (threadProps.threadData.convoState === "SIM_HUMAN") {
      await SimulateHuman(threadProps)();
    } else {
      await TalkAboutMemories(threadProps)();
      return;
    }
  };
};

export default Root;
