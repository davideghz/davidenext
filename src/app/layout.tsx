import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Davide Ghezzi",
  description: "Product Director, developer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex h-full bg-zinc-100 dark:bg-black font-sans">
        <div className="flex w-full">
          {/* Fixed gray frame — always fills the screen behind the white card */}
          <div
            className="fixed inset-0 flex justify-center sm:px-8"
            aria-hidden="true"
          >
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>

          {/* Scrolling content */}
          <div className="relative w-full">
            <main className="mx-auto max-w-7xl sm:px-8">
              <div className="mx-auto max-w-2xl px-4 sm:px-8 lg:max-w-5xl lg:px-12">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
