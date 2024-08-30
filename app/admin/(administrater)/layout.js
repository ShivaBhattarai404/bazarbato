import Navigation from "@/components/_admin/Navigation/Navigation";
import "./utils.css";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/helpers/jwt";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const storedCookies = cookies();
  const token = storedCookies.get("token")?.value;
  const isAdmin = await verifyJwtToken(token);
  if (!isAdmin) {
    return redirect("/admin/login");
  }
  return (
    <main>
      <Navigation>{children}</Navigation>
    </main>
  );
}
