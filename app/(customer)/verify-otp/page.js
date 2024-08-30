import { revalidatePath } from "next/cache";
import OTP_Component from "./otp-component";

async function resendOtp(email) {
  "use server";
  console.log("otp sent to ", email);
}
async function verifyOTP(otp) {
  "use server";
  console.log("otp verified", otp);
  revalidatePath("/app/(customer)/home");
  // return { success: false, message: "Incorrect OTP" };
  return { success: false, message: "OTP expired" };
  // return { success: false, message: "Server Error" };
  // return { success: true };
}
export default function OTP_Verify() {
  const email = "sapanabhandari@gmail.com";
  return (
    <OTP_Component
      email={email}
      resendOtp={resendOtp.bind(null, email)}
      verifyOTP={verifyOTP}
    />
  );
}
