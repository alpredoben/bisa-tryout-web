import axios from "axios";
import { toast } from "react-toastify";
import { Environment as Cfg } from "../constants/environment";

export const Axios = axios.create({
  baseURL: Cfg.BaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Interceptor request (misal attach token)
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(`${Cfg.PrefixStorage}token`);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (optional, untuk error handling global)
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.success;
    const message =
      error?.response?.data?.message || "Terjadi kesalahan pada server";

    switch (status) {
      case 400:
        toast.warning(message || "Permintaan tidak valid");
        break;
      case 401:
        toast.error("Sesi Anda telah habis. Silakan login kembali.");
        localStorage.removeItem(`${Cfg.PrefixStorage}token`);
        window.location.href = "/auth/login";
        break;
      case 403:
        toast.error("Anda tidak memiliki izin untuk mengakses resource ini.");
        break;
      case 404:
        toast.info("Data tidak ditemukan.");
        break;
      case 500:
        toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
        break;
      default:
        toast.error(message);
        break;
    }

    return Promise.reject(error);
  }
);

export default Axios;
