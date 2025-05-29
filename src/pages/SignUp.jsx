import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser();
    navigate("/login")
  };

  const postUser = async () => {
    try {
      const res = await axios.post(
        "https://68219a10259dad2655afc1c9.mockapi.io/users/",
        creds
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
        <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
        <div className="max-w-md w-full bg-[#2d2d2d] text-[#f5f5f5] p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold  mb-6 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium "
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={creds.email}
                onChange={handleChange}
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border  rounded-md shadow-sm "
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium "
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={creds.username}
                onChange={handleChange}
                type="text"
                required
                placeholder="Your username"
                autoComplete="username"
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm "
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium "
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                id="password"
                name="password"
                value={creds.password}
                onChange={handleChange}
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#7c0d23] text-white py-2 px-4 rounded-md hover:bg-[#93112b] transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-[#cd7d8d] hover:underline font-medium mx-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
