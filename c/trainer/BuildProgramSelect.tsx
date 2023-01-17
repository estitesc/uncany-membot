import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { listenProgramsForUser } from "../../model/programData";

const BuildProgramSelect: React.FC = () => {
  const [programIds, setProgramIds] = React.useState([""]);

  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId, setSelProgramId } = React.useContext(BuildContext);

  React.useEffect(() => {
    let unsub;
    setProgramIds([]);
    (async () => {
      if (userId) {
        unsub = listenProgramsForUser(userId, async (programs: any) => {
          if (programs) {
            setProgramIds(Object.keys(programs));
          }
        });
      }
    })();
    return unsub;
  }, [userId]);

  const onSelect = React.useCallback(
    (e: any) => {
      setSelProgramId(e.target.value);
    },
    [setSelProgramId]
  );

  return (
    <div style={{ fontFamily: "Inconsolata", fontSize: 16, margin: "0 24px" }}>
      my programs:
      <select onChange={onSelect}>
        {programIds.map((programIdMap) => (
          <option key={programIdMap} selected={programIdMap === selProgramId}>
            {programIdMap}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BuildProgramSelect;
