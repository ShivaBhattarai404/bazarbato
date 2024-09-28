import { Fragment } from "react";
import MobileNav from "@/components/_customer/MobileNav/MobileNav";

export default async function RootLayout({ children }) {
  return (
    <Fragment>
      <MobileNav />
      {children}
    </Fragment>
  );
}
