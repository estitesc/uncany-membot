import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { createNamedThread } from "../model/threadData";
import SmallButton from "./SmallButton";

const ResetThreadButton: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  const { setThreadId, threadId } = React.useContext(BuildContext);

  const onClick = React.useCallback(async () => {
    const newThreadId = await createNamedThread(userId, "build", "SIM_HUMAN");
    console.log("created thread", newThreadId);
    setThreadId(newThreadId || "DEFAULT");
  }, [setThreadId, userId]);

  return (
    <SmallButton
      onClick={onClick}
      label={threadId ? "reset thread" : "start thread"}
    />
  );
};

export default ResetThreadButton;
