import { Home } from "@/app/icons/Home";
import { SignOutButton } from "@/components/SignOutButton";
import React from "react";

export const FolderListNavbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 px-5 md:px-12 lg:px-24">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <Home /> Vocabulary Builder
        </a>
      </div>

      <div className="flex-none">
        <SignOutButton />
      </div>
    </div>
  );
};
