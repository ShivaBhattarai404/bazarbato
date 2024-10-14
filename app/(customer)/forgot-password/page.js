import { EMAIL_REGEX } from "@/Constants/validation";
import PasswordResetForm from "./form";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User";
import {
  createHash,
  getUser,
  sendResetPasswordEmail,
  setUser,
} from "@/helpers/auth";
import { verifyJwtToken } from "@/helpers/jwt";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Password Reset",
  description: "Password Reset",
};

async function handleSubmit(email) {
  "use server";
  if (!email || !email.match(EMAIL_REGEX)) {
    return { error: "Enter a valid email" };
  }
  try {
    await dbConnect();
    const user = await User.findOne({
      email,
    }).lean();
    if (!user) {
      return { error: "There is no any account registered with this email" };
    }
    // send email with reset link
    await sendResetPasswordEmail({ to: email, user });

    // redirect to page where user can enter new password
    return {
      error:
        "An email has been sent to your registered email address. Click on the link in the email to reset your password",
    };
  } catch (error) {
    return { error: "Something went wrong. Reload the page and try again" };
  }
}

async function resetPassword(token, password) {
  "use server";
  console.log(token);
  if (!password) {
    return { error: "Password is required" };
  }
  if (password?.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }
  const decodedToken = await verifyJwtToken(token);
  if (!decodedToken) {
    return { error: "The link has been expired" };
  }
  try {
    await dbConnect();
    const user = await User.findOne({
      $and: [{ email: decodedToken.email }, { emailVerified: true }],
    });
    if (!user) {
      return {
        error: `User not found. This error occurs when you try to access this link after deletion of your account or you have not verified your email`,
      };
    }
    const passwordHash = await createHash(password);
    user.password = passwordHash;
    await user.save();
    await setUser(user);
    // redirect to profile page
    const error = new Error();
    error.type = "REDIRECT";
    error.url = "/me";
    throw error;
  } catch (error) {
    if (error.type === "REDIRECT") {
      redirect(error.url);
    }
    return { error: "Something went wrong. Reload the page and try again" };
  }
}

export default async function ForgotPassword({ searchParams: { token } }) {
  const user = await getUser();
  if (user) {
    redirect("/me");
  }
  const decodedToken = await verifyJwtToken(token);

  if (token && !decodedToken) {
    return (
      <div>
        <h1>Invalid or Expired token</h1>
      </div>
    );
  } else if (token && decodedToken) {
    return (
      <PasswordResetForm
        title="Create a new Password"
        description="Enter your new password"
        btnText="Reset Password"
        handleSubmit={resetPassword.bind(null, token)}
        inputFor="Password"
        inputName="password"
        inputType="password"
      />
    );
  } else {
    return (
      <PasswordResetForm
        title="Reset Password"
        description="Enter your registered email address to reset your password"
        handleSubmit={handleSubmit}
        btnText="Send Verification Email"
        inputName="email"
      />
    );
  }
}
