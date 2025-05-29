import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
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
    getUser();
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://68219a10259dad2655afc1c9.mockapi.io/users/"
      );
      // Authinticate user
      const userExist = res.data.find(
        (user) =>
          user.username === creds.username && user.password === creds.password
      );
      if (!userExist) {
        return Swal.fire({
          text: "Username or password is incorrect",
          icon: "error",
          confirmButtonColor: "#7c0d23",
          background: "#2d2d2d",
          color: "#fff",
        });
      } else {
        localStorage.setItem("username", creds.username);
        localStorage.setItem("loggedIn", "true");
        navigate("/");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
        <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4 text-[#f5f5f5]">
        <div className="max-w-md w-full bg-[#2d2d2d] p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold  mb-6 text-center">
            Sign in to your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#7c0d23] text-white py-2 px-4 rounded-md hover:bg-[#93112b] transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-sm ">
            Don't have an account?
            <Link
              to="/signUp"
              className="text-[#ad717d] hover:underline font-medium mx-2"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
