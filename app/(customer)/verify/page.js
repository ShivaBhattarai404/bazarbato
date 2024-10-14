// core modules
import { notFound, redirect } from "next/navigation";

// database models
import User from "@/models/User";

// helper functions
import { verifyUser } from "@/helpers/auth";
import dbConnect from "@/helpers/dbConnect";
import { generateJwt } from "@/helpers/jwt";

// constants
import { EMAIL_REGEX } from "@/Constants/validation";

// custom components
import OTP_Component from "./otp-component";

async function resendOtp(email) {
  "use server";
  console.log("otp sent to ", email);
}

export const metadata = {
  title: "Verify Email",
  description: "Verify your email",
};

export default async function Verify({ searchParams: { email } }) {
  if (!email || !email.match(EMAIL_REGEX)) {
    return notFound();
  }

  // check if email is already verified
  await dbConnect();
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return notFound();
  } else if (user.emailVerified) {
    redirect("/me");
  }
  return (
    <OTP_Component
      email={email}
      resendOtp={resendOtp.bind(null, email)}
      verifyOTP={verifyUser}
    />
  );
}
