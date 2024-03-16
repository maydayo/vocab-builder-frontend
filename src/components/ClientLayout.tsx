"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/libs/queryClient";

export function ClientLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
