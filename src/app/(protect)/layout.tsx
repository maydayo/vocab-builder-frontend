"use client";
import { ClientLayout } from "@/components/ClientLayout";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return (
    <ClientLayout>
      <ProtectLayout>{children}</ProtectLayout>
    </ClientLayout>
  );
}

function ProtectLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    return <>{children}</>;
  } else if (status === "unauthenticated") {
    return redirect("/login");
  }
}

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center text-txt-700">
      <div className="loading loading-spinner loading-md"></div>
    </div>
  );
}
