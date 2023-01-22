import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { createNamedNode, getNodeData } from "../../model/nodeData";
import {
  getProgramData,
  getProgramRef,
  setProgramDataFromRef,
} from "../../model/programData";
import AdderWidget from "./AdderWidget";

const NodeAdder: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId } = React.useContext(BuildContext);

  const onAdd = async (nodeId: string) => {
    const existingNodeData = await getNodeData(userId, nodeId);
    if (!existingNodeData) {
      await createNamedNode(userId, nodeId);
    }
    const programRef = getProgramRef(userId, selProgramId);
    const programData = await getProgramData(userId, selProgramId);
    setProgramDataFromRef(programRef, {
      nodes: [...(programData?.nodes || []), nodeId],
    });
  };

  return <AdderWidget onAdd={onAdd} label="add node" />;
};

export default NodeAdder;
