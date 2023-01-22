import * as React from "react";

interface AdderWidgetProps {
  onAdd: (value: string) => void;
  label: string;
}

const AdderWidget: React.FC<AdderWidgetProps> = ({ onAdd, label }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [value, setValue] = React.useState("");

  const resetAdd = () => {
    setValue("");
    setIsExpanded(false);
  };

  const addAndClear = () => {
    resetAdd();
    onAdd(value);
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAndClear();
    }
  };

  return (
    <div style={{ width: 200, display: "flex" }}>
      {!isExpanded ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => setIsExpanded(true)}>+</button>
          <div style={{ fontSize: 12, paddingLeft: 8 }}>{label}</div>
        </div>
      ) : (
        <div>
          <input
            style={{
              width: 100,
              fontSize: 12,
              fontFamily: "Inter",
              backgroundColor: "#E7DFDA",
            }}
            value={value}
            onKeyDown={handleKeydown}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <button
            onClick={addAndClear}
            style={{
              backgroundColor: "#4BA3D2",
              fontFamily: "Inter",
              fontSize: 10,
              marginLeft: 10,
              borderRadius: 48,
              color: "#F9F7F5",
              borderWidth: 0,
              cursor: "pointer",
            }}
          >
            add
          </button>
          <button
            onClick={resetAdd}
            style={{
              backgroundColor: "#4BA3D2",
              fontFamily: "Inter",
              fontSize: 10,
              marginLeft: 10,
              borderRadius: 48,
              color: "#F9F7F5",
              borderWidth: 0,
              cursor: "pointer",
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default AdderWidget;
