"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";

const LoginFrom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const form = event.target;
    console.log(form);

    const userName: string = form.username.value;
    const password: string = form.password.value;

    const userObj = {
      userName,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://localhost:7098/api/Login",
        userObj
      );

      if (response.data) {
        console.log("response: ", response.data);
        setLoading(false);
        localStorage.setItem("token", response.data);
        document.cookie = `token=${response.data}; path=/;`;
        router.push("/dashboard");
        // window.location.href = "/dashboard";
        toast.success("Login successful");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed! Enter correct userName and password");
      console.log("response: ", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center font-bold text-4xl my-12">LOGIN</h1>
      <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="bg-gray-200 py-5 px-4 border-none outline-none rounded-lg"
        />
        <div className="flex justify-between items-center my-8 bg-gray-200 py-5 px-4 rounded-lg">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className=" border-none outline-none h-full bg-transparent"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
          </div>
        </div>
        <input
          type="submit"
          value={loading ? "Logging in... " : "Login"}
          className="bg-primary-blue text-white py-5 font-semibold cursor-pointer rounded-lg"
        />
      </form>
    </div>
  );
};

export default LoginFrom;
