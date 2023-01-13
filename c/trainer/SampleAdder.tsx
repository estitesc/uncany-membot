import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import {
  getNodeData,
  getNodeRef,
  setNodeDataFromRef,
} from "../../model/nodeData";
import {
  createNamedThread,
  getThreadDataFromRef,
  getThreadRef,
} from "../../model/threadData";
import AdderWidget from "./AdderWidget";

const SampleAdder: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  const { selNodeId } = React.useContext(BuildContext);

  const onAdd = async (sampleId: string) => {
    console.log("add sample", sampleId);
    const existingThreadRef = getThreadRef(userId, sampleId);
    const threadData = await getThreadDataFromRef(existingThreadRef);
    if (!threadData) {
      await createNamedThread(userId, "build", "SIM_HUMAN", sampleId);
    }
    const nodeRef = getNodeRef(userId, selNodeId);
    const nodeData = await getNodeData(userId, selNodeId);
    setNodeDataFromRef(nodeRef, {
      samples: [...(nodeData?.samples || []), sampleId],
    });
  };

  return <AdderWidget onAdd={onAdd} label="add sample" />;
};

export default SampleAdder;
