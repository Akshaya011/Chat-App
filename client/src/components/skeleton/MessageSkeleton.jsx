import React from "react";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  
  return (
    <div className="p-4 h-full bg-base-200 rounded-xl shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      <div className="space-y-4">
        {skeletonMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${idx % 2 ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <div className="skeleton w-full h-full rounded-full" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <div className="skeleton h-4 w-16" />
            </div>
            <div className="chat-bubble bg-transparent p-0">
                <div className="skeleton h-16 w-[200px]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSkeleton;
