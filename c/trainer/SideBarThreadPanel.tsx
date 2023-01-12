import * as React from "react";
import DeleteSelButton from "./DeleteSelButton";
import HumanInstructionInput from "./HumanInstructionInput";
// import ThreadProgramIdInput from "./ThreadProgramIdInput";

const SideBarThreadPanel: React.FC = () => {
  return (
    <>
      <div style={{ margin: 24 }}>simulated human instructions</div>
      <HumanInstructionInput />
      <div style={{ margin: 24 }}>{/* <BakeButton /> */}</div>
      <div style={{ margin: "0 24px" }}>
        <DeleteSelButton />
      </div>
      <div style={{ margin: "24px 24px 0" }}>
        {/* <ThreadProgramIdInput /> */}
      </div>
    </>
  );
};

export default SideBarThreadPanel;
