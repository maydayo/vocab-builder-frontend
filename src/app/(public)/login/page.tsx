"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen justify-center items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
      <div className="artboard artboard-demo py-10">
        <button onClick={() => signIn("google")}>Sign in with google</button>
      </div>
    </main>
  );
}
