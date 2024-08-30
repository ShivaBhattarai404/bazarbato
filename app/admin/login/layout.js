// core react and nextjs functions and components
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";

// helper functions
import { verifyJwtToken } from "@/helpers/jwt";

export const metadata = {
  title: "Login",
};

export default async function RootLayout({ children }) {
  const storedCookies = cookies();
  const token = storedCookies.get("token")?.value;
  const isAdmin = await verifyJwtToken(token);
  if (isAdmin) {
    return redirect("/admin/dashboard");
  }
  return <Fragment>{children}</Fragment>;
}
