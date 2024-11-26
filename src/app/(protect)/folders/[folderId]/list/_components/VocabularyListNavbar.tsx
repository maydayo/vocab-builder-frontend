import {
  NavbarBreadCrumb,
  NavbarDirectoryItem,
  NavbarHomeItem,
  NavbarLayout,
  NavbarListItem,
} from "@/components/NavBar";
import React from "react";

type VocabularyListNavbarProps = {
  folderName: string;
  folderId: string;
};
export const VocabularyListNavbar = (props: VocabularyListNavbarProps) => {
  const { folderName, folderId } = props;
  const list = [
    <NavbarHomeItem key="home" />,
    <NavbarDirectoryItem
      key="directory"
      folderName={folderName}
      folderId={folderId}
    />,
    <NavbarListItem
      key="vocabulary"
      name="Vocabulary List"
      href={`/folders/${folderId}/list`}
    />,
  ];
  return (
    <NavbarLayout>
      <NavbarBreadCrumb list={list} />
    </NavbarLayout>
  );
};
