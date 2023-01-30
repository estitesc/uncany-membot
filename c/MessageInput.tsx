import * as React from "react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");

  const sendAndClear = () => {
    setMessage("");
    sendMessage(message);
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendAndClear();
    }
  };

  return (
    <div
      style={{
        height: 80,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        backgroundColor: "#14141A",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 24,
          marginRight: 24,
          width: "100%",
        }}
      >
        <textarea
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: "Inter",
            backgroundColor: "#E7DFDA",
            height: 45,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            resize: "none",
            padding: 4,
          }}
          value={message}
          onKeyDown={handleKeydown}
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <button
          onClick={sendAndClear}
          style={{
            backgroundColor: "#2966A3",
            fontFamily: "Inconsolata",
            fontSize: 16,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            padding: "0 16px",
            color: "#F9F7F5",
            borderWidth: 0,
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
