/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */

interface IChatMessagesProps {
  roomId: string;
}

const ChatMessages: React.FunctionComponent<IChatMessagesProps> = ({
  roomId,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState("0");

  useEffect(() => {
    let intervalId: any;
    const getMessages = async (roomId: string) => {
      const { data } = await axios.get(
        `https://testnet.mirrornode.hedera.com/api/v1/topics/${roomId}/messages`,
        {
          params: {
            encoding: "utf8",
            order: "asc",
            timestamp: `gt:${lastTimestamp}`,
          },
        }
      );

      if (data) {
        if (data.messages.length > 0) {
          setLastTimestamp(
            data.messages[data.messages.length - 1].consensus_timestamp
          );

          let rawMessage: string = "";
          const reducedMessages: any[] = [];
          data.messages.forEach((m: any) => {
            if (m.chunk_info.total > 1) {
              rawMessage = rawMessage + m.message;
              if (m.chunk_info.number === m.chunk_info.total) {
                const message = JSON.parse(rawMessage);

                reducedMessages.push({
                  ...message,
                  runningHash: m.runningHash,
                });

                rawMessage = "";
              }
            } else {
              rawMessage = m.message;
              const message = JSON.parse(rawMessage);

              reducedMessages.push({
                ...message,
                runningHash: m.runningHash,
              });
              rawMessage = "";
            }
          });
          setMessages(reducedMessages);
        }
      }
    };

    if (roomId) {
      intervalId = setInterval(() => getMessages(roomId), 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.map((message: any) => {
        if (message.username !== localStorage.getItem("userName"))
          return (
            <div className="chat-message" key={message.runningHash}>
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">
                      {message.message}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-600 w-10 h-10 text-white rounded-full flex justify-center items-center order-1">
                  <span className="my-auto text-xs">
                    {message.username[0].toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );

        return (
          <div className="chat-message" key={message.runningHash}>
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600  ">
                    {message.message}
                  </span>
                </div>
              </div>
              <div className="bg-gray-600 w-10 h-10 text-white rounded-full flex justify-center items-center order-2">
                <span className="my-auto text-xs">
                  {message.username[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
