import { signOut } from "next-auth/react";

export const SignOutButton: React.FC = () => {
  return (
    <button
      className="btn btn-outline btn-primary btn-sm"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};
