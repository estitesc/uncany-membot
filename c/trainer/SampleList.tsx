import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { listenProgramData } from "../../model/programData";
import SampleAdder from "./SampleAdder";

const SampleList: React.FC = () => {
  const [program, setProgram] = React.useState(undefined as any);

  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId, threadId, setThreadId } =
    React.useContext(BuildContext);

  React.useEffect(() => {
    let unsub;
    (async () => {
      if (selProgramId) {
        unsub = listenProgramData(userId, selProgramId, async (programData) => {
          setProgram(programData);
        });
      }
    })();
    return unsub;
  }, [selProgramId, userId]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {program?.samples
        ? program.samples.map((sample: any, index: number) => {
            return (
              <div key={index} style={{ margin: 12 }}>
                <button
                  style={{
                    backgroundColor: sample === threadId ? "pink" : "white",
                  }}
                  onClick={() => setThreadId(sample)}
                >
                  {sample}
                </button>
              </div>
            );
          })
        : null}
      <div style={{ margin: 12 }}>
        <SampleAdder />
      </div>
    </div>
  );
};

export default SampleList;
