import runNode from "../driver/nodeRunner";

export const useRunLangNodeAsync = (threadProps: ThreadProps) => {
  return async (node: any) => {
    const { messages, uid, threadRef, threadData } = threadProps;
    console.log("uid from threadProps is", uid);

    return await runNode(node, messages, uid, threadRef, threadData);
  };
};
