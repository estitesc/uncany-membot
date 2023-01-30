import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SideBarBrowsePanel from "./SideBarBrowsePanel";
import SideBarThreadPanel from "./SideBarThreadPanel";
import SideBarTopButtons from "./SideBarTopButtons";

const SideBar: React.FC = () => {
  const { sideBarMode } = React.useContext(BuildContext);

  return (
    <div
      style={{
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1A1A23",
        padding: 24,
        borderRight: "1px solid #23232F",
      }}
    >
      <SideBarTopButtons />
      <div
        style={{
          display: sideBarMode === "THREAD" ? "flex" : "none",
          flexDirection: "column",
          marginTop: 24,
        }}
      >
        <SideBarThreadPanel />
      </div>
      <div
        style={{
          display: sideBarMode === "BROWSE" ? "flex" : "none",
          flexDirection: "column",
          marginTop: 24,
        }}
      >
        <SideBarBrowsePanel />
      </div>
    </div>
  );
};

export default SideBar;
