/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: ./src/pages/RegisterPage.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../../services/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconSvg } from "../../assets";
import RegisterForm from "../../components/auth/RegisterForm";
import { Footer, TopNavbar } from "../../layouts/landing";

const schema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  phone: yup.string().required("No. HP wajib diisi"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
  accepted: yup
    .bool()
    .oneOf([true], "Anda harus menyetujui syarat dan ketentuan"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await register(data).unwrap();
      console.log({ RESPONSE_SUBMIT_REGISTER: response });
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registrasi gagal.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />

      <div className="flex-grow flex items-center justify-center px-4 mt-10">
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center bg-blue-100 p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <img
              src={IconSvg.Register}
              alt="Illustration"
              className="mx-auto w-3/4 max-w-xs md:max-w-md"
            />
            <h2 className="text-2xl font-bold mt-6 text-primary-800">
              Bergabunglah Sekarang
            </h2>
            <p className="mt-2 text-sm text-gray-700">Di BISA TryOut.</p>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white mt-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Daftar Akun
            </h2>
            <RegisterForm
              onSubmit={handleSubmit(onSubmit)}
              register={formRegister}
              errors={errors}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
