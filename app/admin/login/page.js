import { redirect } from "next/navigation";
import LoginComponent from "./loginform";
import { cookies } from "next/headers";
import { generateJwt } from "@/helpers/jwt";
import { EMAIL_REGEX } from "@/Constants/validation";


// function to handle admin login
async function loginHandler(email, password) {
  "use server";
  // initialize error array
  const error = new Array(3).fill("");
  if (email.length === 0 && password.length === 0) {
    // Check if email and password are empty
    error[0] = "Email is required";
    error[1] = "Password is required";
    return { ok: false, error };
  } else if (!email) {
    // Check if email is empty
    error[0] = "Email is required";
    return { ok: false, error };
  } else if (email.match(EMAIL_REGEX) === null) {
    // Check if email is valid using rejex
    error[0] = "Invalid Email";
    return { ok: false, error };
  } else if (!password) {
    // Check if password is empty
    error[1] = "Password is required";
    return { ok: false, error };
  }

  // Check if email and password are correct
  if (email === "demo@premps.com" && password === "demo") {
    const storedCookies = cookies();
    // Generate JWT token
    const token = await generateJwt({ email }, "1d");
    // Set token in cookies
    storedCookies.set("token", token);
    // Redirect to dashboard
    redirect("/admin/dashboard");
  } else {
    // if email or password is incorrect show error
    error[2] = "Incorrect email or password";
    return { ok: false, error };
  }
}

export default function login() {
  return <LoginComponent login={loginHandler} />;
}
