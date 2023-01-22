import * as React from "react";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import { listenThreadMessages } from "../model/threadMessageData";
import BuildBub from "./BuildBub";

const DialogPanel: React.FC = () => {
  const [messages, setMessages] = React.useState({});
  const { threadId } = React.useContext(BuildContext);
  const { userId } = React.useContext(SessionUserContext);
  const scrollEndRef = React.useRef(undefined as any);

  React.useEffect(() => {
    if (!threadId || !userId) {
      return;
    }
    const unsub = listenThreadMessages(userId, threadId, (messages: any) => {
      setMessages(messages);
    });
    return unsub;
  }, [threadId, userId]);

  const scrollToBottom = () => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView(false);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        backgroundColor: "#2B1D12",
        flex: 1,
        maxHeight: `calc(100vh - 188px)`,
        overflow: "scroll",
        width: "100%",
      }}
    >
      {threadId ? (
        Object.values(messages).map((message: any, index: number) => {
          const isHumanOrigin = message.originator === "HUMAN";
          return (
            <BuildBub
              message={message}
              sender={
                message.senderLabelDisplay || (isHumanOrigin ? "HUMAN" : "AI")
              }
              senderColor={isHumanOrigin ? "#78C1DD" : "#F69292"}
              content={message.body}
              index={index}
              key={index}
            />
          );
        })
      ) : (
        <div
          style={{
            padding: 12,
            marginLeft: 12,
            marginRight: 12,
            fontFamily: "Inconsolata",
            fontSize: 14,
            color: "#fbfbf8",
          }}
        >
          Select or create a thread to begin.
        </div>
      )}
      <div ref={scrollEndRef} />
    </div>
  );
};

export default DialogPanel;
