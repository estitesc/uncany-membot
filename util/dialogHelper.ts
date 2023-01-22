import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, gmtToUtc } from "./timeFormatter";

export const combineMessageAndReply = (messages: any, replies: any) => {
  let merged: any[] = [];
  Object.values(messages).forEach((messageData: any) => {
    merged.push({ ...messageData, source: "user" });
  });
  Object.values(replies).forEach((replyData: any) => {
    merged.push({ ...replyData, source: "bot" });
  });

  if (merged.length == 0) {
    return [];
  }
  return _.sortBy(merged, "createdAt");
};

export const mapMessagesToDialog = (
  messages: any,
  numLines: number,
  config: any
) => {
  const sorted = _.sortBy(Object.values(messages), "createdAt");
  const amountToSlice = numLines < sorted.length ? numLines : sorted.length;
  return mapToDialog(sorted.slice(-amountToSlice), config);
};

export const mapToDialog = (messages: any, config: any = {}) => {
  const dialog = messages.map((message: any) => {
    const timezoneUtc = gmtToUtc(config.timezoneGmt || "GMT-0:00");
    const messageTime = DateTime.fromSeconds(message.createdAt.seconds, {
      zone: timezoneUtc,
    });
    const formattedTime = formatTime(messageTime);

    const senderName = message.senderLabelPrompt || message.originator;

    return config.withTimestamp
      ? `${senderName} (${formattedTime}): ${message.body}`
      : `${senderName}: ${message.body}`;
  });
  const dialogString = dialog.join("\n");
  return dialogString;
};

export const getLastMessage = (messageData: any) => {
  const messages: any[] = Object.values(messageData);
  return _.last(_.sortBy(messages, "createdAt"));
};
