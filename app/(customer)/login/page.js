import LoginForm from "./form";

export const metadata = {
  title: "Login",
  description: "Login to your account",
  keywords: "login, account, sign in",
};

async function handleSubmit(data) {
  "use server";
  console.log("submitted form");
}
export default function Login() {
  return <LoginForm handleSubmit={handleSubmit} />;
}
