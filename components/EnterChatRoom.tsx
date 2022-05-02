import { useEffect, useState } from "react";

const EnterChatRoom: React.FunctionComponent = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    setRoomId(localStorage.getItem("roomId") || "");
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Join the chat room</h2>
      </div>
      <div>
        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          placeholder="Room ID"
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          placeholder="Your Name"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50 transition duration-200"
        >
          Join
        </button>
      </div>
    </form>
  );
};

export default EnterChatRoom;
