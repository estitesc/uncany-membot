import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import {
  getProgramData,
  getProgramRef,
  setProgramDataFromRef,
} from "../../model/programData";
import {
  createNamedThread,
  getThreadDataFromRef,
  getThreadRef,
} from "../../model/threadData";
import AdderWidget from "./AdderWidget";

const SampleAdder: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId } = React.useContext(BuildContext);

  const onAdd = async (sampleId: string) => {
    console.log("add sample", sampleId);
    const existingThreadRef = getThreadRef(userId, sampleId);
    const threadData = await getThreadDataFromRef(existingThreadRef);
    console.log("existing thread data", threadData);
    if (!threadData) {
      console.log("creating named thread", userId, sampleId);
      await createNamedThread(userId, "build", "SIM_HUMAN", sampleId);
    }
    const programRef = getProgramRef(userId, selProgramId);
    const programData = await getProgramData(userId, selProgramId);
    setProgramDataFromRef(programRef, {
      samples: [...(programData?.samples || []), sampleId],
    });
  };

  return <AdderWidget onAdd={onAdd} label="add sample" />;
};

export default SampleAdder;
