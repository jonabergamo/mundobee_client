"use client";
import { ReactNode } from "react";

import withAuth from "../withAuth";

interface PrivateLayoutProps {
  children: ReactNode;
}

function PrivateLayout({ children }: PrivateLayoutProps) {

  return (
    <div className="h-screen w-screen">
      <main className="h-screen w-full">
        {children}
      </main>
    </div>
  );
}
export default withAuth(PrivateLayout);
