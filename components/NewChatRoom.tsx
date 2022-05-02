import { useState } from "react";
import { useRouter } from "next/router";
import { TopicCreateTransaction } from "@hashgraph/sdk";

import hederaClient from "../libs/hederaClient";

const NewChatRoom: React.FunctionComponent = () => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let txResponse = await new TopicCreateTransaction()
      .setTopicMemo(roomName)
      .execute(hederaClient);
    let receipt = await txResponse.getReceipt(hederaClient);
    let topicId = receipt.topicId;

    if (topicId) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("roomId", topicId.toString());
      router.replace(`/chat/${topicId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <p className="text-gray-600">Or create a new room</p>
      </div>
      <div>
        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          placeholder="Room Name"
          required
          value={roomName}
          onChange={(e: any) => setRoomName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          placeholder="Your Name"
          required
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default NewChatRoom;
