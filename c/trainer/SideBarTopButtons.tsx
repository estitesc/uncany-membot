import * as React from "react";
import BuildContext from "../../contexts/BuildContext";

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
    <div style={{ display: "flex", padding: 8 }}>
      <button
        onClick={goToBrowser}
        style={{
          backgroundColor: sideBarMode === "BROWSE" ? "#aa6699" : "#4BA3D2",
          fontFamily: "Inter",
          fontSize: 16,
          marginLeft: 10,
          padding: 12,
          paddingRight: 18,
          paddingLeft: 18,
          borderRadius: 8,
          color: "#F9F7F5",
          borderWidth: 0,
        }}
      >
        brw
      </button>
      <button
        onClick={goToNode}
        style={{
          backgroundColor: sideBarMode === "NODE" ? "#aa6699" : "#4BA3D2",
          fontFamily: "Inter",
          fontSize: 16,
          marginLeft: 10,
          padding: 12,
          paddingRight: 18,
          paddingLeft: 18,
          borderRadius: 8,
          color: "#F9F7F5",
          borderWidth: 0,
        }}
      >
        node
      </button>
      <button
        onClick={goToThread}
        style={{
          backgroundColor: sideBarMode === "THREAD" ? "#aa6699" : "#4BA3D2",
          fontFamily: "Inter",
          fontSize: 16,
          marginLeft: 10,
          padding: 12,
          paddingRight: 18,
          paddingLeft: 18,
          borderRadius: 8,
          color: "#F9F7F5",
          borderWidth: 0,
        }}
      >
        thr
      </button>
    </div>
  );
};

export default SideBarTopButtons;
