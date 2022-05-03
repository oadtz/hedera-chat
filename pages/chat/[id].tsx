import { TopicInfoQuery } from "@hashgraph/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatMessages from "../../components/ChatMessages";
import ChatNewMessage from "../../components/ChatNewMessage";

import hederaClient from "../../libs/hederaClient";

const Chat: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const getTopic = async () => {
      try {
        const query = new TopicInfoQuery().setTopicId(String(id));

        const { topicId, topicMemo } = await query.execute(hederaClient);

        setRoomId(topicId.toString());
        setRoomName(topicMemo);
      } catch (e) {
        alert("Error loading chat room");
        router.replace("/");
      }
    };

    if (id) {
      getTopic();
    }
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("userName") || !localStorage.getItem("roomId")) {
      router.replace("/");
    }
  }, []);

  if (!roomId) return null;

  return (
    <div className="flex-1 p:2 sm:p-2 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{roomName}</span>
            </div>
            <span className="text-lg text-gray-600">Room ID: {roomId}</span>
          </div>
        </div>
      </div>
      <ChatMessages />
      <ChatNewMessage />
    </div>
  );
};

export default Chat;
