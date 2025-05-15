import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { FaImage } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const fileInputRef = useRef();
  const { sendMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select a image file only");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text && !previewImage) return;
    try {
      const res = await sendMessages({
        text: text,
        image: previewImage,
      });
      setText("");
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("failed to send message", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {previewImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="w-20 h-20 border border-zinc-700 rounded-lg object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              x
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage}>
        <div className="flex gap-2 flex-1 items-center">
          <input
            type="text"
            className="input input-bordered rounded-lg input-sm sm:input-md w-full"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${previewImage ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <FaImage size={20} />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim() && !previewImage}
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
