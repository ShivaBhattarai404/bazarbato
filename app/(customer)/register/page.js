import RegisterForm from "./form";

export const metadata = {
  title: "Register",
  description: "Register",
};

async function registerUser(formData) {
  "use server";
  const fullName = formData.get("name");
}
export default function Register() {
  return <RegisterForm handleSubmit={registerUser} />;
}
