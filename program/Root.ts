import TalkAboutMemories from "./TalkAboutMemories";

const Root: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Root");

  return async () => {
    await TalkAboutMemories(threadProps)();
    return;
  };
};

export default Root;
