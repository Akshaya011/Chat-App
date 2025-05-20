import React, { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import avatar from "../constants/avatar.jpg";
import avatar2 from "../constants/avatar2.jpg";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessage,
    unsubscribeFromMessage,
    selectedMessages,
    selectMessages,
  } = useChatStore();
  const messageEndRef = useRef(null)
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [selectedUser._id, getMessages]);
  useEffect(()=>{
    if(messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({behavior:"auto"})
  })
  const handleDoubleClickMsg=(id)=>{
    selectMessages(id);
  }
  if (isMessagesLoading)
    return (
      <div className="w-full flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="w-full flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages &&
          messages.map((message) => (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`chat ${
                message.senderId == authUser._id ? "chat-end bg-primary text-primary-content" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="border rounded-full size-10">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || avatar
                        : selectedUser.profilePic || avatar2
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs ml-1 opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className={`chat-bubble ${selectedMessages.includes(message._id)?"bg-green-300":""}`} onDoubleClick={()=>handleDoubleClickMsg(message._id)}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
