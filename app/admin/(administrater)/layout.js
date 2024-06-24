import Navigation from "@/components/Navigation/Navigation";

export default function RootLayout({ children }) {
  return (
    <main>
      <Navigation>{children}</Navigation>
    </main>
  );
}
