import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  usePageTitle("Registration");
  const { signInWithGoogle, signUpWithEmailPass, updateUser, setUser } =
    use(AuthContext);

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const rex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (password && !rex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter and be 6+ characters long."
      );
    } else {
      setPasswordError("");
    }
  }, []);

  const saveUserMutation = useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post("http://localhost:3000/user", userData);
      return data;
    },
    onSuccess: (data, variables) => {
      setUser({
        displayName: variables.name,
        email: variables.email,
        photoURL: variables.image,
      });
      toast.success("Registration successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to register user");
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await signUpWithEmailPass(data.email, data.password);
      const user = result.user;

      await updateUser(user, data.name, data.image);

      const userData = {
        name: data.name,
        email: user.email,
        image:
          data.image || "https://i.ibb.co.com/pvWPkg07/man-illustration.webp",
      };

      saveUserMutation.mutate(userData);
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle(googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      saveUserMutation.mutate(userData);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="bg-linear-to-br from-[#5dae61] via-[#3b7d5e] to-[#183153] py-10">
      <div className="flex items-center justify-center w-11/12 m-auto">
        <div className="bg-white backdrop-blur-md shadow-2xl rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#3b7d5e]">
            Create an Account
          </h1>
          <p className="text-gray-600 mb-8">
            Join our food-sharing community today!
          </p>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) =>
                      rex.test(value) ||
                      "Must contain uppercase, lowercase, and be 6+ characters",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-gray-500 cursor-pointer z-10"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.963 9.963 0 012.223-3.394M6.3 6.3l11.4 11.4M9.88 9.88A3 3 0 0114.12 14.12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {passwordError && (
              <p className="text-red-400 text-sm">{passwordError}</p>
            )}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Image URL
              </label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="text"
                placeholder="Enter your image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.image && (
                <p className="text-red-400 text-sm">{errors.image.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="themeBtn w-full"
              disabled={saveUserMutation.isPending}
            >
              <span>
                {saveUserMutation.isPending ? "Registering..." : "Register"}
              </span>
            </button>
          </form>
          <div className="relative my-8">
            <hr className="text-[#E9E9E9]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 inter font-semibold text-sm sm:text-[16px] bg-white">
              OR
            </span>
          </div>
          <button
            onClick={() => handleGoogleSignUp()}
            className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#5dae61] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
