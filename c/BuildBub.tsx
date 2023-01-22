import * as React from "react";
import SelectorButton from "./SelectorButton";
import TermLineBub from "./TermLineBub";

interface BuildBubProps {
  message: any;
  content: string;
  sender: string;
  senderColor: string;
  index: number;
}

const BuildBub: React.FC<BuildBubProps> = ({
  message,
  content,
  sender,
  senderColor,
  index,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <SelectorButton selected={false} index={index} message={message} />
      <TermLineBub
        content={content}
        sender={sender}
        senderColor={senderColor}
      />
    </div>
  );
};

export default BuildBub;
