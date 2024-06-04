"use client";
import { ReactNode } from "react";

import withAuth from "../withAuth";
import Aside from "@/components/aside";

interface PrivateLayoutProps {
  children: ReactNode;
}

function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="h-screen w-screen">
      <main className="flex min-h-screen w-full">
        <div className="border-r">
          <Aside />
        </div>
        <div className="flex w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            {children}
          </main>
        </div>
      </main>
    </div>
  );
}
export default withAuth(PrivateLayout);
