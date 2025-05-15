import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; // import your auth store

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  selectedMessages: [],

  getUsers: async () => {
    const { authUser } = useAuthStore.getState();
    if (!authUser?.token) return toast.error("Unauthorized");

    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Failed to load users");
      console.error("getUsers:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    const { authUser } = useAuthStore.getState();
    if (!authUser?.token) return toast.error("Unauthorized");

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Failed to load messages");
      console.error("getMessages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { authUser } = useAuthStore.getState();
    const { selectedUser, messages } = get();

    if (!authUser?.token || !selectedUser?._id) {
      return toast.error("Missing auth or selected user");
    }
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Failed to send message");
      console.error("sendMessages:", error);
    }
  },
  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();
    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        selectedUser._id === newMessage.senderId;
      if (!isMessageFromSelectedUser) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },
  unsubscribeFromMessage: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
  //  needs optimization
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  selectMessages: (id) => {
    const { selectedMessages } = get();
    if (selectedMessages.includes(id))
      set({
        selectedMessages: selectedMessages.filter((msgId) => msgId != id),
      });
    else set({ selectedMessages: [...selectedMessages, id] });
  },
  handleDeleteSelected: async () => {
    const {selectedMessages} = get()
    try {
      await axiosInstance.post("/messages/delete-multiple", {
        messageIds: selectedMessages,
      });
      // Remove deleted messages from state
      set((state) => ({
        messages: state.messages.filter(
          (msg) => !state.selectedMessages.includes(msg._id)
        ),
        selectedMessages: [], // optional: clear selection
      }));
      toast.success("Messages deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete messages");
    }
  },
}));
