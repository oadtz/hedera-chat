import type { NextPage } from "next";
import EnterChatRoom from "../components/EnterChatRoom";
import NewChatRoom from "../components/NewChatRoom";

const Home: NextPage = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <EnterChatRoom />
        <NewChatRoom />
      </div>
    </section>
  );
};

export default Home;
