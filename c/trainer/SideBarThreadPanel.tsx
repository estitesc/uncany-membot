import * as React from "react";
import DeleteSelButton from "./DeleteSelButton";
import HumanInstructionInput from "./HumanInstructionInput";
// import ThreadProgramIdInput from "./ThreadProgramIdInput";

const SideBarThreadPanel: React.FC = () => {
  return (
    <>
      <div style={{ color: "#F6F7F9", marginBottom: 8 }}>
        SIMULATOR INSTRUCTIONS
      </div>
      <HumanInstructionInput />
      <div style={{ marginTop: 24 }}>
        <DeleteSelButton />
      </div>
      <div style={{ margin: "24px 24px 0" }}>
        {/* <ThreadProgramIdInput /> */}
      </div>
    </>
  );
};

export default SideBarThreadPanel;
