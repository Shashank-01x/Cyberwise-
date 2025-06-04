"use client";

import { Inter } from "next/font/google";
import { ReactNode} from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="flex-1 relative">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
