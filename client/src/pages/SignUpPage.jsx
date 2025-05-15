import React, { use, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FiMessageSquare } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AuthImagePatterns from "../components/AuthImagePatterns";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();
  const validateForm = () => {
    console.log(formData);
    const errors = [];

    if (!formData.fullName.trim()) errors.push("Full name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.push("Invalid email format");
    if (!formData.password) errors.push("Password is required");
    if (formData.password.length < 6)
      errors.push("Password must be at least 6 characters");

    if (errors.length > 0) {
      // Combine all errors into a single string separated by line breaks
      const errorMessage = errors.join("\n");
      toast.error(errorMessage, {
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
        // Add options as needed
      });
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success) signUp(formData);
  };
  return (
    <div className="flex items-center h-screen justify-center ">
      {/* left part */}
      <div className="flex flex-col mr-30 w-1/3 ">
        <div className="flex flex-col items-center">
          <div
            className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
          >
            <FiMessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60">
            Get started with your free account
          </p>
        </div>
        <form action="">
          <div className="form-control">
            <div className="mb-4 space-y-2">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative w-full flex ">
                <div className="absolute pt-3 z-5 pointer-events-none">
                  <CiUser className=" ml-2 text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  className="z-1 input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setformData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className=" w-full flex ">
                <div className="relative pt-3 z-5">
                  <MdOutlineMail className="absolute ml-2 text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  className="z-1 input input-bordered w-full pl-10"
                  placeholder="abc@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className=" w-full flex ">
                <div className="relative pt-3 z-2">
                  <RiLockPasswordLine className="absolute ml-2 text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  className="z-1 input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn mt-6 btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <LuLoaderCircle className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      {/* right part */}
      <div className="mt-14">
        <div>
          <AuthImagePatterns
            title="join our community"
            subtitle="connect with friends, share memories and stay in touch with your loved ones"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
