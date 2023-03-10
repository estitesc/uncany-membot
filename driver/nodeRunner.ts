import { getCompletionFromParams } from "../lib/openAI";
import { getRelevantDialogBlocks } from "../lib/memory";
import { mapMessagesToDialog } from "../util/dialogHelper";

const runNode = async (
  node: any,
  messages: any,
  uid: string,
  threadRef: any,
  threadData: any
) => {
  const numLines = node.dialogConfig?.numLines || 10;
  const dialog = mapMessagesToDialog(messages, numLines, {
    ...node.dialogConfig,
  });

  let selDialogBlocks = [] as string[];
  if (node?.dataConfig?.getPersonalDialogMatches) {
    const { selectDialogBlocks } = await getRelevantDialogBlocks(
      dialog,
      threadData,
      uid
    );
    selDialogBlocks = selectDialogBlocks;
  }

  const prompt = node.promptTemplate(
    dialog,
    {
      selDialogBlocks,
    },
    threadData
  );
  // console.log("got prompt", prompt);

  console.log("getting completion");
  const completion = await getCompletionFromParams({
    prompt,
    ...node.gptConfig,
  });
  // console.log("completion is", completion);

  const handlerResponse = await node.completionHandler(
    uid,
    threadRef,
    completion,
    threadData
  );
  return handlerResponse;
};

export default runNode;
