import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FiMessageSquare } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";

const SignUpPage = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;
    const errors = [];

    if (!fullName.trim()) errors.push("Full name is required");
    if (!email.trim()) errors.push("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) errors.push("Invalid email format");
    if (!password || password.length < 6)
      errors.push("Password must be at least 6 characters");

    if (errors.length) {
      toast.error(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signUp(formData);
  };

  const inputFields = [
    {
      label: "Full Name",
      icon: <CiUser />,
      type: "text",
      name: "fullName",
      placeholder: "John Doe",
      value: formData.fullName,
    },
    {
      label: "Email",
      icon: <MdOutlineMail />,
      type: "email",
      name: "email",
      placeholder: "abc@gmail.com",
      value: formData.email,
    },
    {
      label: "Password",
      icon: <RiLockPasswordLine />,
      type: showPassword ? "text" : "password",
      name: "password",
      placeholder: "••••••••",
      value: formData.password,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary/50 to-secondary/0 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center mb-6">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FiMessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-3">Create Account</h1>
          <p className="text-sm text-gray-500">
            Get started with your free account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map(({ label, icon, ...input }) => (
            <div key={input.name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  {icon}
                </span>
                <input
                  {...input}
                  className="input input-bordered w-full pl-10"
                  onChange={(e) =>
                    setformData({ ...formData, [input.name]: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          ))}

          <div className="text-sm">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <LuLoaderCircle className="size-5 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
