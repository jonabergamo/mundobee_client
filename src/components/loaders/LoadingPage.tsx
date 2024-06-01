"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DotsLoader from "./DotsLoader";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 400);
  }, [router]);

  return (
    <div className="text-primary h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <DotsLoader />
      <span >Carregando...</span>
    </div>
  );
}
