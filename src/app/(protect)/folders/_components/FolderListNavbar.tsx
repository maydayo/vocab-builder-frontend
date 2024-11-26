import { SignOutButton } from "@/components/SignOutButton";
import React from "react";

export const FolderListNavbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 px-5 md:px-12 lg:px-24">
      <div className="flex-1"></div>

      <div className="flex-none">
        <SignOutButton />
      </div>
    </div>
  );
};
