"use client";
import { ClientLayout } from "@/components/ClientLayout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return (
    <ClientLayout>
      <PublicLayout>{children}</PublicLayout>
    </ClientLayout>
  );
}

function PublicLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;
  const { status } = useSession();

  if (status === "authenticated") {
    return redirect("/folders");
  }
  return <>{children}</>;
}
