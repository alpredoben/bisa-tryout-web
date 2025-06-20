/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginAccount from "./icon/login-account.svg";
import RegisterAccount from "./icon/register-account.svg";
import HeroImage from "./icon/hero.svg";
import ExamBro from "./icon/Exams-bro.svg";
import LogoCPNS from "./icon/tryout-cpns.png";
import LogoUpCareer from "./icon/carrer-up.png";
import LogoBUMN from "./icon/bumn-indo.png";
import IconEye from "./icon/eye-svgrepo-com.svg";

import IconDashboard from "./icon/dashboard-svgrepo-com.svg";
import IconConfig from "./icon/setting-1-svgrepo-com.svg";
import IconExam from "./icon/exam-svgrepo-com.svg";
import IconQuestion from "./icon/question-and-answer-svgrepo-com.svg";
import IconReport from "./icon/sql-reporting-svgrepo-com.svg";
import IconAccount from "./icon/account-member-network-svgrepo-com.svg";

export const IconSvg = {
  Login: LoginAccount,
  Register: RegisterAccount,
  HeroImage: HeroImage,
  ExamBro,
  LogoCPNS,
  LogoUpCareer,
  LogoBUMN,
  IconEye,
};

export const IconMenu: {[key:string]: any} = {
  "Dashboard": IconDashboard,
  "Konfigurasi": IconConfig,
  "Master Tryout": IconExam,
  "Master Pertanyaan": IconQuestion,
  "Laporan": IconReport,
  "Pengaturan Akun": IconAccount,
} as const;

