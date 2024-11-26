import { Home } from "@/app/icons/Home";
import { SignOutButton } from "@/components/SignOutButton";
import React from "react";

type DirectoryNavbarProps = {
  folderName: string;
};
export const DirectoryNavbar = (props: DirectoryNavbarProps) => {
  const { folderName } = props;
  return (
    <div className="navbar bg-base-100 px-5 md:px-12 lg:px-24">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/folders">
          Vocabulary Builder
        </a>
        /
        <a className="btn btn-ghost text-xl">
          <Home /> {folderName}
        </a>
      </div>

      <div className="flex-none">
        <SignOutButton />
      </div>
    </div>
  );
};
