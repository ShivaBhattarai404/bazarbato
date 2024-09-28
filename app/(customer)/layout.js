// helper functions
import { getUser } from "@/helpers/crud";

// custom components
import Nav from "@/components/_customer/Nav/Nav";
import Footer from "@/components/_customer/Footer/Footer";
import Header from "@/components/_customer/Header/Header";

// styles
import "./global.css";

// redux provider component
// directly Provider is not used here
// if Provider is used here, we had to make layout client component which is not possible
import UserContextProvider from "../store/UserContextProvider";

export const metadata = {
  title: "Home | Premps",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <UserContextProvider user={user}>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </UserContextProvider>
  );
}
