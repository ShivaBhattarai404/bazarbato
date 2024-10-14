// core modules
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// helper functions
import { getUser, resendVerificationEmail, setUser } from "@/helpers/auth";
import { generateJwt } from "@/helpers/jwt";
import dbConnect from "@/helpers/dbConnect";

// database models
import User from "@/models/User";

// constants
import { EMAIL_REGEX } from "@/Constants/validation";

// custom components
import LoginForm from "./form";

export const metadata = {
  title: "Login",
  description: "Login to your account",
  keywords: "login, account, sign in",
};

async function handleSubmit(formData) {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email && !password) {
    return { error: "Email and password are required" };
  } else if (!email) {
    return { error: "Email is required" };
  } else if (!password) {
    return { error: "Password is required" };
  }

  // check if email is valid using regex
  if (!email.match(EMAIL_REGEX)) {
    return { login: false, error: "Please enter a valid email" };
  }

  // check for password length
  if (password.length < 6) {
    return {
      login: false,
      error: "Password must be at least 8 characters long",
    };
  }

  // connect to database
  try {
    await dbConnect();
  } catch (error) {
    return { login: false, error: "Server Error. Please try again." };
  }
  try {
    // if valid, check if email exists in database
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return { login: false, error: "Email doesn't exists" };
    }

    // if user exists but if user has not been verified then resend verfication email and redirect to verify page
    if (!user.emailVerified) {
      await resendVerificationEmail(email);
      const error = new Error("REDIRECT");
      error.URL = `/verify?email=${email}`;
      throw error;
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // if not, return error
      return { login: false, error: "Incorrect password" };
    }

    // if correct, set cookies for login and token for user verification and login status
    await setUser(user);

    // return login status
    return {
      login: true,
      error: null,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        gender: user.gender,
      },
    };
  } catch (error) {
    if (error.message === "REDIRECT") {
      redirect(error.URL);
    }
    return { login: false, error: "Server Error. Please try again." };
  }
}
export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <LoginForm login={handleSubmit} />;
}
