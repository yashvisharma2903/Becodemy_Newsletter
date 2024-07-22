import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/globals.css";
import Providers from "@/shared/utils/Providers";
import localFont from "next/font/local";
import { UserProvider } from "@auth0/nextjs-auth0/client";

// const inter = Inter({ subsets: ["latin"] });
const clashDisplay = localFont({
  src: "../assets/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clashDisplay",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${clashDisplay.variable}`}>
          <Providers>{children}</Providers>
        </body>
      </UserProvider>
    </html>
  );
}
