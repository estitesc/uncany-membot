import { sendMessage } from "../lib/twilio";
import { createReplyMessage } from "../model/threadMessageData";
import { getUserData } from "../model/userData";

export const handleStoreReply = async (
  uid: string,
  threadRef: any,
  body: string,
  threadData: any
) => {
  const result = await createReplyMessage(uid, threadData.id, body);
  console.log("result", result);

  const userData: any = await getUserData(uid);
  if (threadData?.type === "text" && userData?.phone) {
    console.log("sending text message via twilio");
    await sendMessage(body, userData.phone);
  }

  return body;
};
