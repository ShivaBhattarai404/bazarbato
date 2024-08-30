import PasswordResetForm from "./form";

export const metadata = {
  title: "Password Reset",
  description: "Password Reset",
};

async function handleSubmit(event) {
  "use server";
  console.log("password reset successful");
}

export default function ForgotPassword() {
  return <PasswordResetForm handleSubmit={handleSubmit} />;
}
