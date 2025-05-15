import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { CiUser } from "react-icons/ci";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../constants/avatar.jpg";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const {onlineUsers} = useAuthStore();
  useEffect(() => {
    if (authUser) {
      getUsers();
    }
  }, [authUser, getUsers]);
  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside
      className="h-full w-40 overflow-auto lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full sm:p-2 md:p-5">
        <div className="flex items-center gap-2">
          <CiUser className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* online filter toggle */}
      </div>
      <div className="w-full overflow-y-auto py-3">
        {users.map((user) => (
          <button
            key={user?._id}
            onClick={() => setSelectedUser(user)}
            className={`
                    w-full p-3 flex items-center gap-3
                    hover:bg-base-300 transition-colors
                    ${
                      selectedUser?._id === user._id
                        ? "bg-base-300 ring-1 ring-base-300"
                        : ""
                    }
                  `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || avatar}
                alt=""
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id.toString()) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            {/* User info - only visible on larger screens */}
            <div className="block text-left min-w-0 ">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
