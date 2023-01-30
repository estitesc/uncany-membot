import * as React from "react";
import BuildContext from "../contexts/BuildContext";

interface SelectorButtonProps {
  message: any;
  selected?: boolean;
  index: number;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({
  message,
  selected,
  index,
}) => {
  // const [selected, setSelected] = React.useState(false);

  // const handleClick = () => {
  //   setSelected(!selected);
  //   onClick(selected);
  // };
  // console.log("message is", message);

  const { handleSelectLine, selMessages } = React.useContext(BuildContext);

  const handleClick = () => {
    handleSelectLine(message);
  };

  const selMsgIds = selMessages.map((m: any) => m.id);

  return (
    <button
      onClick={handleClick}
      style={{
        borderStyle: "none",
        backgroundColor: selMsgIds.includes(message.id) ? "#50E28F" : "#1A1A23",
        borderRadius: 8,
        cursor: "pointer",
        height: 16,
        width: 16,
        border: "1px solid #fff",
      }}
    />
  );
};

export default SelectorButton;
