import * as React from "react";
import WordMark from "./WordMark";

const MarkBarSimple: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#23232F",
        padding: 12,
      }}
    >
      <div style={{ paddingLeft: 12 }}>
        <WordMark />
      </div>
    </div>
  );
};

export default MarkBarSimple;
