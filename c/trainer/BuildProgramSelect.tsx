import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { getProgramsForUser } from "../../model/programData";

const BuildProgramSelect: React.FC = () => {
  const [programIds, setProgramIds] = React.useState([""]);

  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId, setSelProgramId } = React.useContext(BuildContext);

  React.useEffect(() => {
    (async () => {
      if (userId) {
        const programs = await getProgramsForUser(userId);
        console.log("threads data is", userId, programs);

        setProgramIds(Object.keys(programs));
      }
    })();
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
