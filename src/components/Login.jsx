"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SchoolGirl from "../../public/assets/SchoolGirl.jpeg";
import { apiPost } from "../../Utils/http";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      // LOGIN
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      try {
        setLoading(true);
        const { ok, data } = await apiPost("authapp/api/auth/login/", payload);

        if (data.message === "Login successful") {
          toast.success(`${data.message}, Welcome ${data.username}!`);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("user_id", data.user_id);
          router.push("/");
        } else {
          toast.error(data?.message || "Login failed.");
        }
      } catch (err) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else {
      // REGISTER
      if (formData.password !== formData.confirmPassword) {
        return setMessage("Passwords do not match.");
      }

      const payload = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        password: formData.password,
        user_roles: 2,
      };

      try {
        setLoading(true);
        const { ok, data } = await apiPost(
          "authapp/api/auth/register/",
          payload
        );

        if (ok) {
          toast.success("Registered successfully!");
          setIsLogin(true);
          router.push("/login");
        } else {
          const errorText =
            typeof data === "object"
              ? Object.entries(data)
                  .map(([key, val]) => `${key}: ${val.join(", ")}`)
                  .join("\n")
              : data.message || "Registration failed.";
          setMessage(errorText);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:block relative">
          <Image
            src={SchoolGirl}
            alt="School Girl"
            layout="fill"
            objectFit="cover"
            className="rounded-l-3xl"
          />
        </div>

        <div className="w-full px-6 py-10 sm:px-10 sm:py-14 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            {isLogin ? "Log in to your account" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                Password
              </label>
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    Confirm Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    Last Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    Phone Number
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                  />
                  <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-focus:top-2">
                    Address
                  </label>
                </div>
              </>
            )}

            {message && (
              <p
                className={`text-sm ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
