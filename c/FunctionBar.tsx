import * as React from "react";
import BuildThreadSelect from "./BuildThreadSelect";
import DialogResetThreadButton from "./DialogResetThreadButton";
import ResetThreadButton from "./ResetThreadButton";

const FunctionBar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1A1A23",
        // backgroundColor: "#939333",
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 12 }}>
          <ResetThreadButton />
        </div>
        <div style={{ marginLeft: 24 }}>
          <DialogResetThreadButton />
        </div>
      </div>
      <div style={{ marginRight: 12 }}>
        <BuildThreadSelect />
      </div>
    </div>
  );
};

export default FunctionBar;
