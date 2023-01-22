import { useRouter } from "next/router";
import * as React from "react";
import SessionUserContext from "../../contexts/SessionUserContext";
import SmallButton from "../SmallButton";

const DeleteSelButton: React.FC = () => {
  const { userId } = React.useContext(SessionUserContext);
  const router = useRouter();

  const onClick = React.useCallback(async () => {
    console.log("not implemented");
  }, [router, userId]);

  return <SmallButton onClick={onClick} label={"delete selection"} />;
};

export default DeleteSelButton;
