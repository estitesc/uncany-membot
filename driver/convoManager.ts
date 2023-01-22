import _ from "lodash";
import { getThreadMessagesFromRef } from "../model/threadMessageData";
import { getThreadDataFromRef, getThreadRef } from "../model/threadData";
import Root from "../program/Root";

const advanceConvo = async (
  uid: string,
  source: string = "text",
  threadId: string = ""
) => {
  // First off you need to get the threadRef
  const threadRef = getThreadRef(uid, threadId);
  const messages = await getThreadMessagesFromRef(threadRef);

  let convoState = "PERSONAL_MEM";
  let threadData: any = await getThreadDataFromRef(threadRef);
  threadData.id = threadId;
  // console.log("threadData is", threadData);
  if (threadData?.convoState) {
    convoState = threadData.convoState;
  }

  const runRoot = Root({ messages, uid, threadRef, threadData });
  await runRoot();
};

export default advanceConvo;
