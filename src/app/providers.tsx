import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/authContext";
import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <main>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["orange", "purple", "green", "dark"]}
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </main>
  );
}
