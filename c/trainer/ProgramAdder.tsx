import * as React from "react";
import SessionUserContext from "../../contexts/SessionUserContext";
import { createNamedProgram } from "../../model/programData";
import AdderWidget from "./AdderWidget";

const ProgramAdder: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);

  const onAdd = async (programId: string) => {
    await createNamedProgram(userId, programId);
  };

  return <AdderWidget onAdd={onAdd} label="add program" />;
};

export default ProgramAdder;
