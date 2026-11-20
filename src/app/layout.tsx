import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Celebration of Love | Wedding Invitation",
  description: "You are warmly invited to celebrate a beautiful new beginning."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
