import { resendVerificationEmail, setUser } from "@/helpers/auth";
import EmailForm from "../forgot-password/form";
import User from "@/models/User";
import { EMAIL_REGEX } from "@/Constants/validation";
import dbConnect from "@/helpers/dbConnect";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Verify your account",
  description: "Verify your account",
};
async function handleSubmit(email) {
  "use server";
  if (!email || !email.match(EMAIL_REGEX)) {
    return { error: "Enter a valid email" };
  }
  // declaring redirectURL here because redirect() internally throws an error
  //   which is then caught by the try-catch block and the error message is returned
  let redirectURL = "";
  try {
    await dbConnect();
    const user = await User.findOne({
      email,
    }).lean();
    if (!user) {
      return { error: "There is no account registered with this email" };
    }
    if (user.emailVerified) {
      await setUser(user);
      redirectURL = "/me";
    } else {
      // send email verification link
      const { error } = await resendVerificationEmail(email);
      if (error) return { error };
      redirectURL = "/verify?email=" + email;
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Reload the page and try again" };
  }
  if (redirectURL) {
    redirect(redirectURL);
  }
}
export default async function VerifyAccount() {
  return (
    <EmailForm
      title="Verify your account"
      description="Enter your registered email address to get the otp"
      handleSubmit={handleSubmit}
    />
  );
}
