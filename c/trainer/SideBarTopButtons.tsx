import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import ToggleButton from "../ToggleButton";

const SideBarTopButtons: React.FC = () => {
  const { sideBarMode, setSideBarMode } = React.useContext(BuildContext);

  const goToBrowser = () => {
    setSideBarMode("BROWSE");
  };

  const goToNode = () => {
    setSideBarMode("NODE");
  };

  const goToThread = async () => {
    setSideBarMode("THREAD");
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <ToggleButton
          onClick={goToBrowser}
          selected={sideBarMode === "BROWSE"}
          label="brw"
        />
      </div>
      <div style={{ paddingLeft: 8 }}>
        <ToggleButton
          onClick={goToNode}
          selected={sideBarMode === "NODE"}
          label="node"
        />
      </div>
      <div style={{ paddingLeft: 8 }}>
        <ToggleButton
          onClick={goToThread}
          selected={sideBarMode === "THREAD"}
          label="thr"
        />
      </div>
    </div>
  );
};

export default SideBarTopButtons;
