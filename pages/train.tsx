import React from "react";
import _ from "lodash";
import type { NextPage } from "next";
import {
  createMessageFromTrainer,
  listenThreadMessages,
} from "../model/threadMessageData";
import HeadWithFonts from "../c/HeadWithFonts";
import MessageInput from "../c/MessageInput";
import { createUser, userExists } from "../model/userData";
import MarkBarSimple from "../c/MarkBarSimple";
import FunctionBar from "../c/FunctionBar";
import SideBar from "../c/trainer/SideBar";
import BuildContext from "../contexts/BuildContext";
import SessionUserContext from "../contexts/SessionUserContext";
import DialogPanel from "../c/DialogPanel";

const Train: NextPage = () => {
  const [messages, setMessages] = React.useState([""]);

  const { userId, setUserId } = React.useContext(SessionUserContext);
  const { threadId, setSelMessages } = React.useContext(BuildContext);

  React.useEffect(() => {
    setSelMessages([]);
  }, [setSelMessages, threadId]);

  const createNewUser = React.useCallback(async () => {
    const newUserId = await createUser();
    // We need to store the user data in localStorage
    if (newUserId) {
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
      console.log("new created", newUserId);
    }
  }, []);

  const loadUserId = React.useCallback(async () => {
    const storedUserId = localStorage.getItem("userId");
    console.log("got stored User Id ", storedUserId);

    if (!storedUserId) {
      console.log("none stored, creating new");
      createNewUser();
      return;
    }

    const userDoesExist = await userExists(storedUserId);

    if (userDoesExist) {
      console.log("found existing, setting id");
      setUserId(storedUserId);
    } else {
      console.log("no corresponding db entry, creating new");
      createNewUser();
    }
  }, [createNewUser]);

  // const loadUserFromLocal = useLoadUserFromLocal(userId);
  // This needs to be in a useEffect or it will fire too early, but it should only be called once.
  React.useEffect(() => {
    loadUserId();
  }, [loadUserId]);

  const scrollEndRef = React.useRef(undefined as any);

  const scrollToBottom = () => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView(false);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (!threadId || !userId) {
      return;
    }
    console.log("setting up por listen", userId, threadId);
    const unsub = listenThreadMessages(userId, threadId, (messages: any) => {
      setMessages(messages);
    });
    return unsub;
  }, [threadId, userId]);

  const sendMessage = async (message: string) => {
    if (!message.length) {
      return;
    }
    await createMessageFromTrainer(userId, threadId, message);

    const response = await fetch("/api/readAndReplyThread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: userId, threadId }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <HeadWithFonts />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#fbfbf8",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MarkBarSimple />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <SideBar />
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FunctionBar />
            <DialogPanel />
            <MessageInput sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
