import { sendMessage } from "../lib/twilio";
import { createThreadReplyAndEmbed } from "../model/threadReplyData";
import { getUserData } from "../model/userData";

export const handleStoreReply = async (
  uid: string,
  threadRef: any,
  body: string,
  threadData: any
) => {
  console.log("entering handle store reply", body);

  const result = await createThreadReplyAndEmbed(
    uid,
    threadRef,
    threadData.id,
    body
  );

  const userData: any = await getUserData(uid);
  if (threadData?.type === "text" && userData?.phone) {
    console.log("sending text message via twilio");
    await sendMessage(body, userData.phone);
  }

  return body;
};
