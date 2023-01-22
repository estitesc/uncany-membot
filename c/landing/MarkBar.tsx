import * as React from "react";
import WordMark from "../WordMark";

const MarkBar: React.FC = () => {
  return (
    <div
      style={{
        height: 44,
        width: "100%",
        display: "flex",
        paddingTop: 16,
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <WordMark />
    </div>
  );
};

export default MarkBar;
