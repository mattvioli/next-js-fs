import "../globals.css";
import { Providers } from "../providers";
import { Navbar } from "../components/navbar";

export const metadata = {
  title: "Welcome",
  description: "This is a website"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Providers>{children}</Providers>
    </>
  );
}
