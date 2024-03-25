"use client";
import { ClientLayout } from "@/components/ClientLayout";
import { useMe } from "@/hooks/me.hook";
import { clientCookies } from "@/libs/cookies";
import { redirect, useRouter } from "next/navigation";

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
  const router = useRouter();

  const logout = () => {
    clientCookies.remove("token");
    router.push("/login");
  };

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

  return (
    <>
      <header className="px-5 md:px-12 lg:px-24 py-5 flex justify-end">
        <button className="btn btn-outline btn-primary btn-sm" onClick={logout}>
          Logout
        </button>
      </header>
      {children}
    </>
  );
}
