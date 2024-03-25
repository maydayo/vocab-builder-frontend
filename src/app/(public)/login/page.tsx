"use client";

import { useLogin } from "@/hooks/login.hook";
import { clientCookies } from "@/libs/cookies";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { loginAsync, isError, isPending, errorMessage } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = await loginAsync(data);
      clientCookies.set("token", token);
      router.push("/folders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
      <form
        className="artboard artboard-demo py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            {...register("username", { required: true })}
          />
        </label>
        {errors.username && (
          <span className="text-error">This field is required</span>
        )}

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-error">This field is required</span>
        )}

        <button className="btn w-20 btn-primary border-sm mt-6">
          {isPending ? <span className="loading-spinner" /> : "Login"}
        </button>
        {isError ? <span className="text-error">{errorMessage}</span> : null}
      </form>
    </main>
  );
}
