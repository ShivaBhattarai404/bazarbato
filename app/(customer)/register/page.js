import RegisterForm from "./form";

export const metadata = {
  title: "Register",
  description: "Register",
};

async function handleSubmit(formData) {
  "use server";
  console.log("Registering customer", formData);
}
export default function Register() {
  return <RegisterForm handleSubmit={handleSubmit} />;
}
