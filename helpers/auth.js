"use server";

// core modules
import { cookies } from "next/headers";

// third-party modules
import nodemailer from "nodemailer";
import { hashSync } from "bcryptjs";

// helper functions
import { generateJwt, verifyJwtToken } from "./jwt";

// constants
import { OTP_LENGTH } from "@/Constants/auth";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import User from "@/models/User";
import OTP from "@/models/OTP";
import { deepCopy } from "./utils";
import { decode } from "jsonwebtoken";
import { EMAIL_REGEX } from "@/Constants/validation";

// function to create a hash from given string
export async function createHash(text) {
  const hashedText = hashSync(text, 12);
  return hashedText;
}

// function to get user from token stored in cookies
export async function getUser() {
  const cookieStore = cookies();
  const loginToken = cookieStore.get("user-token")?.value;

  let user = null;
  if (loginToken) {
    try {
      user = await verifyJwtToken(loginToken);
    } catch (error) {
      console.error("Invalid token");
    }
  }

  return user;
}

export async function setUser(user) {
  try {
    const token = await generateJwt(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
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
  } catch (error) {
    return null;
  }
}
export async function verifyUser({ otp, token }) {
  if (!otp && !token) return { error: "Invalid token" };
  const decodedToken = await verifyJwtToken(token);
  if (token) {
    if (!decodedToken) return { error: "Token Expired" };
  }

  try {
    await dbConnect();

    // if the user is already verified then no need to verify again, just return null error
    // and the caller of this function will redirect the user to the profile page
    if (decodedToken) {
      const userFromToken = await User.findOne({
        email: decodedToken.email,
      }).lean();
      if (!userFromToken) return { error: "User not found" };
      if (userFromToken.emailVerified) return { error: null };
    }

    const otpDoc = token
      ? await OTP.findById(decodedToken._id)
      : await OTP.findOne({ otp });
    if (!otpDoc)
      return {
        error: "Incorrect or expired OTP, your otp only lasts for 5 minutes",
      };

    const { email } = otpDoc;
    // update the user's emailVerified field to true and delete the expiresAt field
    const user = await User.findOneAndUpdate(
      { email },
      { emailVerified: true, $unset: { expiresAt: "" } },
      { new: true }
    )
      .select("firstName lastName email phone gender avatar")
      .lean();
    // and delete the token from the database
    await OTP.findByIdAndDelete(otpDoc._id);
    // set the cookies for the verified user
    await setUser(user);
    // remove the cached user data
    revalidatePath("/");
    revalidatePath("/(customer)", "layout");
    return { error: null };
  } catch (error) {
    return { error: "Server Error, reload the page and try again" };
  }
}
export async function logoutUser() {
  const cookieStore = cookies();
  cookieStore.set("user-token", "", {
    expires: new Date(0),
  });
  return redirect("/");
}
// function to generate otp
export async function generateOTP(email = "", phone = "", type = "email") {
  const generatedOTP = Math.random()
    .toString()
    .substring(2, OTP_LENGTH + 2);

  try {
    await dbConnect();
    const otpDoc = new OTP({
      email,
      phone,
      otp: generatedOTP,
      type,
    });
    const response = await otpDoc.save();
    return deepCopy(response);
  } catch (error) {
    console.error("from generateOTP /helpers/auth.js line 97", error);
    throw new Error("Error generating OTP");
  }
}

// function to check resend verification email to verify email
export async function resendVerificationEmail(email = "") {
  // check if email is valid
  const emailIsValid = email.match(EMAIL_REGEX);
  if (!emailIsValid) {
    return { error: "Invalid email" };
  }
  try {
    await dbConnect();
    const existingOtp = await OTP.findOne({
      $and: [
        { email },
        { lastGeneratedOtpIn: { $gt: new Date(Date.now() - 60000) } },
      ],
    });
    if (existingOtp) {
      return { error: null };
    }
    await OTP.deleteMany({ email });
    await sendVerificationEmail(email);
    return { error: null };
  } catch (error) {
    return { error: "Server Error. Failed to resend OTP" };
  }
}

// function to send verification email
export async function sendVerificationEmail(to = "") {
  // 'to' is email where email is to be sent
  const email = process.env.EMAIL;
  const password = process.env.EMAIL_APP_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    const { _id, otp } = await generateOTP(to);
    const token = await generateJwt({ email: to, _id });

    const content = `<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
    <h2 style="color: #333333; text-align: center;">Welcome to Premps!</h2>
    <p style="color: #666666;">Thank you for signing up! Please verify your email address to activate your account.</p>
    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 10px;">Your verification code is: <span style="color: #007bff; font-weight: bold;">${otp}</span></p>
    <p style="color: #666666;">Or you can click the following link to verify your email:</p>
    <a href="http://localhost:3000/verify/${token}" style="display: block; text-align: center; text-decoration: none; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Verify Email</a>
    <p style="color: #666666; margin-top: 20px;">If you did not sign up for an account on techtales, you can safely ignore this email.</p>
    <p style="color: #666666;">Thanks,<br> The Premps Team</p>
    </div>
    </body>`;

    const response = await transporter.sendMail({
      from: `Premps ${email}`,
      to: to,
      subject: "Verify your email",
      html: content,
    });
    return true;
  } catch (error) {
    console.error("from auth.js sendVerificationEmail line no: 173", error);
    return false;
  }
}

export async function sendResetPasswordEmail({ to }) {
  const email = process.env.EMAIL;
  const password = process.env.EMAIL_APP_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    const token = await generateJwt({ email: to });

    const content = `<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
    <h2 style="color: #333333; text-align: center;">Reset your password</h2>
    <p style="color: #666666;">You requested to reset your password. Please click the following link to reset your password:</p>
    <a href="http://localhost:3000/forgot-password?token=${token}" style="display: block; text-align: center; text-decoration: none; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Reset Password</a>
    <p style="color: #666666; margin-top: 20px;">This link will expire after 5 minutes.</p>
    <p style="color: #666666; margin-top: 20px;">If you did not request to reset your password, you can safely ignore this email.</p>
    <p style="color: #666666;">Thanks,<br> The Premps Team</p>
    </div>
    </body>`;

    const response = await transporter.sendMail({
      from: `Premps ${email}`,
      to: to,
      subject: "Reset your password",
      html: content,
    });
  } catch (error) {
    return null;
  }
}
