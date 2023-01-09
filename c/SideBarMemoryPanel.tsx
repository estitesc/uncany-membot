import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { listenThreadData } from "../model/threadData";
// import MemoryInput from "./MemoryInput";

const SideBarMemoryPanel: React.FC = () => {
  const { threadId } = React.useContext(BuildContext);
  const { userId } = React.useContext(SessionUserContext);

  const [threadData, setThreadData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!threadId || !userId) {
      return;
    }
    const unsub = listenThreadData(userId, threadId, (data: any) => {
      console.log("data", data);
      setThreadData(data);
    });
    return unsub;
  }, [threadId, userId]);

  const renderMemoryBuffer = () => {
    if (
      !threadData?.relevanceBuffer ||
      threadData?.relevanceBuffer.length === 0
    ) {
      return null;
    }

    return threadData.relevanceBuffer.map(
      (bufferEntry: string) => <div style={{ margin: 12 }}>{bufferEntry}</div>,
      []
    );
  };

  return (
    <>
      <div style={{ padding: 12, fontWeight: "bold" }}>
        Memories currently in buffer:
      </div>
      <div style={{ fontSize: 12, paddingBottom: 48 }}>
        {renderMemoryBuffer()}
      </div>
    </>
  );
};

export default SideBarMemoryPanel;
