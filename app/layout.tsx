import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import { Afacad, Noto_Kufi_Arabic } from "next/font/google";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-noto-kufi',
});

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-afacad',
});

export const metadata: Metadata = {
  title: "Zera3a - Smart Farming Platform",
  description: "Connect with local markets and sell your crops at better prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoKufiArabic.variable} ${afacad.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
