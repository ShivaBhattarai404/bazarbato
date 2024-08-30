import { Inter } from "next/font/google";
// import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Premps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="overlay" />
        {children}
      </body>
    </html>
  );
}
