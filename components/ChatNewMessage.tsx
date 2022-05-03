import { TopicId, TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { useState } from "react";
import hederaClient from "../libs/hederaClient";

const ChatNewMessage: React.FunctionComponent = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let txResponse = await new TopicMessageSubmitTransaction({
      topicId: TopicId.fromString(localStorage.getItem("roomId") || ""),
      message: JSON.stringify({
        username: localStorage.getItem("userName"),
        message,
      }),
    }).execute(hederaClient);

    let receipt = await txResponse.getReceipt(hederaClient);

    if (receipt.status) {
      setMessage("");
    } else {
      alert("Error submitting your message");
    }
  };

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <form onSubmit={handleSubmit} className="relative flex">
        <input
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatNewMessage;
