import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { createNamedThread } from "../model/threadData";
import SmallButton from "./SmallButton";

const DialogResetThreadButton: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  // console.log("session user id is", userId);
  const { setThreadId, threadId } = React.useContext(BuildContext);

  const onClick = React.useCallback(async () => {
    const newThreadId = await createNamedThread(userId, "build", "RECALL");
    console.log("created thread", newThreadId);
    setThreadId(newThreadId || "DEFAULT");
  }, [setThreadId, userId]);

  return (
    <SmallButton
      onClick={onClick}
      label={threadId ? "reset live thread" : "start live thread"}
    />
  );
};

export default DialogResetThreadButton;
