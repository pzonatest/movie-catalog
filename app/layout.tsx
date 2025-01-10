import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "Movie Catalog",
  description: "A minimal movie catalog application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} font-mono bg-gray-950 text-gray-200 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-6 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
