import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Join the chat room</h2>
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            placeholder="Room ID"
          />
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div>
          <button className="w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50 transition duration-200">
            Join
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Or create a new room</p>
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            placeholder="Room Name"
          />
        </div>
        <div>
          <input
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div>
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
            Create
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
