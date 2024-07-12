"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/libs/queryClient";
import { SessionProvider } from "next-auth/react";

export function ClientLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
