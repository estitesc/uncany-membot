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
        height: "100%",
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E7DFDA",
      }}
    >
      <SideBarTopButtons />
      <div
        style={{
          display: sideBarMode === "THREAD" ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <SideBarThreadPanel />
      </div>
      <div
        style={{
          display: sideBarMode === "BROWSE" ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <SideBarBrowsePanel />
      </div>
    </div>
  );
};

export default SideBar;
