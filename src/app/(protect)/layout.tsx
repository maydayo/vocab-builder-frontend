"use client";
import { ClientLayout } from "@/components/ClientLayout";

export default function Layout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return <ClientLayout>{children}</ClientLayout>;
}
