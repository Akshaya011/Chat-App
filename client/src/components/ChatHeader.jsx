import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex gap-2 border-b border-base-300 p-2.5">
      <div className="avatar">
        <div className="size-10 rounded-full relative">
          <img
            src={selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
            alt={selectedUser.fullName}
          />
        </div>
      </div>
      <div className="flex justify-between min-w-full items-center">
        <div className="">
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-zinc-400">
            {onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}
          </p>
        </div>
        <button className="mr-20" onClick={() => setSelectedUser(null)}>X</button>
      </div>
    </div>
  );
};

export default ChatHeader;
