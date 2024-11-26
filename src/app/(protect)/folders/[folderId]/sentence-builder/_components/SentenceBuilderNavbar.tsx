import {
  NavbarBreadCrumb,
  NavbarDirectoryItem,
  NavbarHomeItem,
  NavbarLayout,
  NavbarListItem,
} from "@/components/NavBar";
import React from "react";

type SentenceBuilderNavbarProps = {
  folderName: string;
  folderId: string;
};
export const SentenceBuilderNavbar = (props: SentenceBuilderNavbarProps) => {
  const { folderName, folderId } = props;
  const list = [
    <NavbarHomeItem key="home" />,
    <NavbarDirectoryItem
      key="directory"
      folderName={folderName}
      folderId={folderId}
    />,

    <NavbarListItem
      key="sentence"
      name="Sentence Builder"
      href={`/folders/${folderId}/sentence-builder`}
    />,
  ];
  return (
    <NavbarLayout>
      <NavbarBreadCrumb list={list} />
    </NavbarLayout>
  );
};
