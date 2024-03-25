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

  const { isPending, isSuccess } = useMe();

  if (isPending) {
    return <>Checking Auth</>;
  }

  if (isSuccess) {
    redirect("/folders");
  }

  return <>{children}</>;
}
