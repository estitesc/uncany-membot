import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { getThreadRef, setThreadDataFromRef } from "../../model/threadData";
import SmallButton from "../SmallButton";

const HumanInstructionInput: React.FC = () => {
  const [instructions, setInstructions] = React.useState("");

  const { userId } = React.useContext(SessionUserContext);
  const { threadId } = React.useContext(BuildContext);

  const applyUpdate = () => {
    const threadRef = getThreadRef(userId, threadId);
    setThreadDataFromRef(threadRef, {
      humanSimInstructions: instructions,
    });
  };

  const speak = async () => {
    const response = await fetch("/api/readAndReplyThread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: userId, threadId }),
    });
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyUpdate();
    }
  };

  return (
    <div>
      <div>
        <textarea
          style={{
            width: 220,
            height: 200,
            fontSize: 16,
            fontFamily: "Inter",
            backgroundColor: "#E7DFDA",
            resize: "none",
            borderRadius: 8,
          }}
          value={instructions}
          onKeyDown={handleKeydown}
          onChange={(e: any) => setInstructions(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", marginTop: 8 }}>
        <SmallButton onClick={applyUpdate} label="apply" />
        <div style={{ paddingLeft: 8 }}>
          <SmallButton onClick={speak} label="speak" />
        </div>
      </div>
    </div>
  );
};

export default HumanInstructionInput;
