import {
  NavbarBreadCrumb,
  NavbarDirectoryItem,
  NavbarHomeItem,
  NavbarLayout,
} from "@/components/NavBar";
import React from "react";

type DirectoryNavbarProps = {
  folderName: string;
  folderId: string;
};
export const DirectoryNavbar = (props: DirectoryNavbarProps) => {
  const { folderName, folderId } = props;
  const list = [
    <NavbarHomeItem key="home" />,
    <NavbarDirectoryItem
      key="directory"
      folderName={folderName}
      folderId={folderId}
    />,
  ];
  return (
    <NavbarLayout>
      <NavbarBreadCrumb list={list} />
    </NavbarLayout>
  );
};
