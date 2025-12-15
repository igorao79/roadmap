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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'theme-color': '#3ddac1',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-navbutton-color': '#3ddac1',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} status-bar-ios`}>
        <Loader />
        {children}
      </body>
    </html>
  );
}

