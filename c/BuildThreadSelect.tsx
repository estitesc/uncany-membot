import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { listenUserThreads } from "../model/threadData";

const BuildThreadSelect: React.FC = () => {
  const [threadIds, setThreadIds] = React.useState([""]);

  const { userId } = React.useContext(SessionUserContext);
  const { threadId, setThreadId } = React.useContext(BuildContext);

  React.useEffect(() => {
    let unsub;
    (async () => {
      if (userId) {
        unsub = listenUserThreads(userId, (threads: any) => {
          setThreadIds(Object.keys(threads));
        });
      }
    })();
    return unsub;
  }, [userId]);

  const onSelect = React.useCallback(
    (e: any) => {
      setThreadId(e.target.value);
    },
    [setThreadId]
  );

  return (
    <div style={{ fontFamily: "Inconsolata", fontSize: 16, color: "#F6F7F9" }}>
      thread:
      <select
        onChange={onSelect}
        style={{
          fontFamily: "Inconsolata",
          paddingLeft: 4,
          borderRadius: 4,
          marginLeft: 4,
        }}
      >
        <option key="none selected" selected={!threadId}>
          none
        </option>
        {threadIds.map((threadIdMap) => (
          <option key={threadIdMap} selected={threadIdMap === threadId}>
            {threadIdMap}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BuildThreadSelect;
