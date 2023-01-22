import * as React from "react";
import BuildContext from "../../contexts/BuildContext";
import SessionUserContext from "../../contexts/SessionUserContext";
import { getNodeData } from "../../model/nodeData";
import { listenProgramData } from "../../model/programData";
import NodeAdder from "./NodeAdder";
import SampleList from "./SampleList";

const BrowseNodeList: React.FC = () => {
  const [nodes, setNodes] = React.useState([] as any[]);

  const { userId } = React.useContext(SessionUserContext);
  const { selProgramId, selNodeId, setSelNodeId } =
    React.useContext(BuildContext);

  React.useEffect(() => {
    let unsub;
    setNodes([]);
    (async () => {
      if (selProgramId) {
        unsub = listenProgramData(userId, selProgramId, async (programData) => {
          if (programData?.nodes) {
            const newNodes = [] as any[];
            for (const nodeId of programData.nodes) {
              let nodeData = await getNodeData(userId, nodeId);
              nodeData = { ...nodeData, id: nodeId };
              if (nodeData) {
                newNodes.push(nodeData);
              }
            }
            setNodes(newNodes);
          }
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
      {nodes && nodes.length > 0
        ? nodes.map((node: any, index: number) => {
            return (
              <div key={index} style={{ margin: 12 }}>
                <button
                  style={{
                    backgroundColor: selNodeId === node.id ? "pink" : "white",
                  }}
                  onClick={() => setSelNodeId(node.id)}
                >
                  {node.id}
                </button>
                {selNodeId === node.id ? <SampleList /> : null}
              </div>
            );
          })
        : null}
      <div style={{ margin: 12 }}>
        <NodeAdder />
      </div>
    </div>
  );
};

export default BrowseNodeList;
