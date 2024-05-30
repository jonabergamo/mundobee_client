import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import CustomToaster from "@/components/CustomToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next Auth Middleware Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className)}>
        <Providers>
          <CustomToaster />
          <main className="flex overflow-x-hidden overflow-y-auto text-foreground bg-background h-screen w-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
