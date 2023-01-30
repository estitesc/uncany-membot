import * as React from "react";

interface SmallButtonProps {
  onClick: () => void;
  label: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        borderStyle: "none",
        backgroundColor: "#0B0B14",
        fontFamily: "Inconsolata",
        fontSize: 14,
        color: "#fff",
        padding: "10px 16px",
        borderRadius: 6,
        cursor: "pointer",
        border: "1px solid #fff",
      }}
    >
      {label}
    </button>
  );
};

export default SmallButton;
