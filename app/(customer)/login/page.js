// core modules
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import LoginForm from "./form";
import { generateJwt } from "@/helpers/jwt";
import { EMAIL_REGEX } from "@/Constants/validation";
import User from "@/models/User";
import dbConnect from "@/helpers/dbConnect";
import { revalidatePath } from "next/cache";

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
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
      return { login: false, error: "Email doesn't exists" };
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // if not, return error
      return { login: false, error: "Incorrect password" };
    }

    // if correct, set cookies for login and token for user verification and login status
    const token = await generateJwt(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        avatar: user.avatar,
      },
      "7d"
    );

    // set cookies for login and token for user verification and login status
    cookies().set({
      name: "user-token",
      value: token,
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    // remove the cached user data
    revalidatePath("/");
    revalidatePath("/(customer)", "layout");
    // return login status
    return {
      login: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        gender: user.gender,
      },
    };
  } catch (error) {
    return { login: false, error: "Server Error. Please try again." };
  }
}
export default function Login() {
  return <LoginForm login={handleSubmit} />;
}
