import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import BuildProgramSelect from "./BuildProgramSelect";
import ProgramAdder from "./ProgramAdder";
import SampleList from "./SampleList";

const SideBar: React.FC = () => {
  const { selNodeId } = React.useContext(BuildContext);

  return (
    <>
      <BuildProgramSelect />
      <div style={{ marginLeft: 24, marginTop: 8 }}>
        <ProgramAdder />
      </div>

      <SampleList />
    </>
  );
};

export default SideBar;
