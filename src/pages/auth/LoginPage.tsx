/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/pages/auth/Login.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IconSvg } from "../../assets";
import {Environment as Cfg} from '../../constants/environment'


import {
  useLazyGetProfileQuery,
  useLoginMutation,
} from "../../services/authApi";
import { setAuth, setUserProfile } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Footer, TopNavbar } from "../../layouts/landing";

import {FullScreenLoader} from "../../components/common/FullScreenLoader";

const loginSchema = yup.object({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Minimal 6 karakter")
    .required("Password wajib diisi"),
  remember_me: yup.boolean().default(false),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGetProfile] = useLazyGetProfileQuery();

  const [loadingPage, setLoadingPage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const eventOnSubmit = async (data: LoginFormInputs) => {
    try {
      setLoadingPage(true);
  
      const response = await login({ ...data }).unwrap();
      const token = response?.data?.access_token;
  
      if (!token) {
        throw new Error("Token tidak ditemukan dalam response");
      }
  
      dispatch(setAuth({ token }));
      localStorage.setItem(`${Cfg.PrefixStorage}token`, token);
  
      const profileResponse = await triggerGetProfile().unwrap();
      const user = profileResponse?.data;
  
      if (!user) {
        throw new Error("Data profil tidak ditemukan");
      }
  
      dispatch(setUserProfile({ user }));
  
      toast.success("Login berhasil");
  
      // Redirect setelah semuanya OK
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      const message =
        err?.data?.message ||
        err?.message ||
        "Login gagal. Periksa kembali kredensial akun Anda.";
      toast.error(message);
    } finally {
      setLoadingPage(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <div className="flex-grow flex items-center justify-center px-4 mt-10">
        {/* Left: Image and Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 hidden lg:flex items-center justify-center bg-blue-100 mt-5"
        >
          <div className="text-center p-8">
            <img
              src={IconSvg.Login}
              alt="Login"
              className="w-80 mx-auto mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Selamat Datang di TryOut Career
            </h2>
            <p className="text-gray-600 mt-2">
              Silakan login untuk melanjutkan ke panel admin.
            </p>
          </div>
        </motion.div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full lg:w-1/2 items-center justify-center px-4 mt-5"
        >
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Login
            </h1>
            <form onSubmit={handleSubmit(eventOnSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  {...register("remember_me")}
                  type="checkbox"
                  id="remember_me"
                  className="mr-2"
                />
                <label htmlFor="remember_me" className="text-sm">
                  Ingat Saya
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-60"
              >
                {isLoading ? "Memproses..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
      {loadingPage && <FullScreenLoader />}
    </div>
  );
};

export default LoginPage;
