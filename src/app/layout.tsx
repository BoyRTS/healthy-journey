import type { Metadata } from "next";
import { Kanit, Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { ClerkAppProvider } from "@/components/auth/ClerkAppProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-sans-thai",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-serif-thai",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-coach-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Healthy Journey | Premium Wellness Coaching",
  description: "Premium wellness coaching prototype for members and coaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${notoSerifThai.variable} ${kanit.variable}`}>
      <body>
        <ClerkAppProvider>{children}</ClerkAppProvider>
      </body>
    </html>
  );
}
