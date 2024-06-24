import { Fragment } from "react";

export const metadata = {
  title: "Admin",
};

export default function RootLayout({ children }) {
  return <Fragment>{children}</Fragment>;
}
