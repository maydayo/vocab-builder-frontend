import React, { ReactNode } from "react";
import { SignOutButton } from "./SignOutButton";
import { FolderIcon } from "@/app/icons/FolderIcon";
import Link from "next/link";

export const NavbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="navbar bg-base-100 px-5 md:px-12 lg:px-24">
      <div className="flex-1">{children}</div>

      <div className="flex-none">
        <SignOutButton />
      </div>
    </div>
  );
};

export const NavbarBreadCrumb = ({ list }: { list: ReactNode[] }) => {
  return list.map((item, index) => (
    <React.Fragment key={index}>
      {item}
      {index < list.length - 1 && "/"}
    </React.Fragment>
  ));
};
export const NavbarListItem = ({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon?: ReactNode;
}) => {
  return (
    <Link className="btn btn-ghost text-xl" href={href}>
      {icon} {name}
    </Link>
  );
};

export const NavbarHomeItem = () => {
  return <NavbarListItem name="Vocabulary Builder" href="/folders" />;
};

export const NavbarDirectoryItem = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: string;
}) => {
  return (
    <NavbarListItem
      name={folderName}
      href={`/folders/${folderId}`}
      icon={<FolderIcon />}
    />
  );
};
