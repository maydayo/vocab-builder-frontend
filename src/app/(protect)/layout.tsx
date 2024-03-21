"use client";
import { ClientLayout } from "@/components/ClientLayout";
import { useMe } from "@/hooks/me.hook";
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

  const { isError, isPending } = useMe();
  if (isError) {
    redirect("/login");
  }

  if (isPending) {
    return (
      <div className="h-full w-full flex items-center justify-center text-txt-700">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  return <>{children}</>;
}
