import * as React from "react";

interface TermLineBubProps {
  content: string;
  sender: string;
  senderColor: string;
}

const TermLineBub: React.FC<TermLineBubProps> = ({
  content,
  sender,
  senderColor,
}) => {
  return (
    <div
      style={{
        padding: 12,
        marginRight: 12,
        fontFamily: "Inconsolata",
        fontSize: 14,
      }}
    >
      <span
        style={{ color: senderColor, fontWeight: "bold" }}
      >{`${sender} > `}</span>
      <span style={{ color: "#F6F7F9" }}>{content}</span>
    </div>
  );
};

export default TermLineBub;
