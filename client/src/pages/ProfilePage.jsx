import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../constants/avatar.jpg";

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [selectedImg,setSelectedImg] = useState("");
  const { authUser } = useAuthStore();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  // const { updateProfile } = useAuthStore();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        useAuthStore.getState().updateProfile(base64String);
      };
      reader.readAsDataURL(file);
  };
  }
  return (
    <div className="min-h-screen w-full pt-20">
      <div className=" max-w-3xl mx-auto p-4 ">
      <h1 className="text-3xl font-semibold mb-10 ">Profile</h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative">
          <img
            src={
              selectedImg||authUser?.profilePic || avatar
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          <button
            onClick={handleImageClick}
            className="absolute bottom-1 right-1 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
          >
            <FaCamera className="text-gray-700" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-medium">
            UserName - {authUser?.fullName}
          </h2>
          <p className="text-gray-600">email - {authUser?.email}</p>
        </div>
      </div>

      <div className="bg-base-300 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Account Information:</h3>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-medium">Member Since:</span>{" "}
            {new Date(authUser?.createdAt).toLocaleDateString() || "N/A"}
          </p>
          <p>
            <span className="font-medium">Account Status:</span>{" "}
            <span className="text-green-600">Active</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
