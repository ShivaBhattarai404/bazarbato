import { redirect } from "next/navigation";
import LoginComponent from "./loginform";

export const metadata = {
  title: "Login",
};

async function loginHandler(email, password) {
  "use server";
  const error = new Array(3).fill("");
  if (email.length === 0 && password.length === 0) {
    error[0] = "Email is required";
    error[1] = "Password is required";
    return { ok: false, error };
  } else if (!email) {
    error[0] = "Email is required";
    return { ok: false, error };
  } else if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
    error[0] = "Invalid Email";
    return { ok: false, error };
  } else if (!password) {
    error[1] = "Password is required";
    return { ok: false, error };
  }

  if (email === "demo@gmail.com" && password === "demo") {
    redirect("/admin/dashboard");
  } else {
    error[2] = "Incorrect email or password";
    return { ok: false, error };
  }
}

export default async function Login() {
  return <LoginComponent login={loginHandler} />;
}
