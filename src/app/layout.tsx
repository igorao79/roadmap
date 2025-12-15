import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Loader } from "../components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Roadmap",
  description: "Interactive frontend development roadmap by igorao79",
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Loader />
        {children}
      </body>
    </html>
  );
}

