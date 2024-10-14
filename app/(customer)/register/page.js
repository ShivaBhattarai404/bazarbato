// core modules
import fs from "fs/promises";
import { redirect } from "next/navigation";

// database models
import User from "@/models/User";

// CONSTANTS
import { EMAIL_REGEX } from "@/Constants/validation";

// helper functions
import { getUser, sendVerificationEmail } from "@/helpers/auth";
import { createHash } from "@/helpers/auth";
import dbConnect from "@/helpers/dbConnect";

// custom components
import RegisterForm from "./form";

export const metadata = {
  title: "Register",
  description: "Register",
};

// function to validate input
async function validateInput(formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const gender = String(formData.get("gender")).toLowerCase();
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  if (!firstName) {
    return { error: "First name is required" };
  }
  if (!lastName) {
    return { error: "Last name is required" };
  }
  if (gender !== "male" && gender !== "female" && gender !== "other") {
    return { error: "Invalid gender" };
  }
  if (!phone || isNaN(+phone) || phone.length !== 10) {
    return { error: "Enter a valid phone number" };
  }
  if (!email.match(EMAIL_REGEX)) {
    return { error: "Enter a valid email" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }
  if (password !== repeatPassword) {
    return { error: "Password does not match" };
  }

  try {
    await dbConnect();

    const emailAlreadyExists = Boolean(await User.findOne({ email }).lean());
    if (emailAlreadyExists) {
      return { error: "This email is already associatd with another account" };
    }
  } catch (error) {
    return { error: "An error occurred. Please try again" };
  }
  return {
    error: null,
    userDetails: {
      firstName,
      lastName,
      gender,
      phone,
      email,
      password,
    },
  };
}

// function to choose a random avatar for user
async function chooseAvatar(gender = "male") {
  gender = String(gender).toLowerCase();
  if (gender !== "male" && gender !== "female" && gender !== "other") {
    throw new Error("Invalid gender");
  }
  const avatars = await fs.readdir(`public/avatars/${gender}`);
  const avatar = `/avatars/${gender}/${
    avatars[Math.floor(Math.random() * avatars.length)]
  }`;
  return avatar;
}

async function registerUser(formData) {
  "use server";
  const response = await validateInput(formData);
  if (response.error) {
    return response;
  }
  const { userDetails } = response;
  try {
    await dbConnect();
    const user = new User({
      ...userDetails,
      password: await createHash(userDetails.password),
      avatar: await chooseAvatar(userDetails.gender),
    });
    await user.save();
    await sendVerificationEmail(userDetails.email);
  } catch (error) {
    return { error: "An error occurred. Please try again" };
  }
  redirect("/verify?email=" + String(userDetails.email).toLowerCase().trim());
}
export default async function Register() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <RegisterForm handleSubmit={registerUser} />;
}
