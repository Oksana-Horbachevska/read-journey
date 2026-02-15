import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"], //  Medium, Bold
  variable: "--font-family",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["600"], // SemiBold
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Read Journey App",
  description: "Created by Oksana Horbachevska",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <TanStackProvider>
          <div className="container"> {children}</div>
        </TanStackProvider>
      </body>
    </html>
  );
}
