import {
  NavbarBreadCrumb,
  NavbarDirectoryItem,
  NavbarHomeItem,
  NavbarLayout,
  NavbarListItem,
} from "@/components/NavBar";
import React from "react";

type ParagraphNavBarProps = { folderName: string; folderId: string };
export const ParagraphNavBar = (props: ParagraphNavBarProps) => {
  const { folderName, folderId } = props;
  const list = [
    <NavbarHomeItem key="home" />,
    <NavbarDirectoryItem
      key="directory"
      folderName={folderName}
      folderId={folderId}
    />,
    <NavbarListItem key="paragraphs" name="Learn from context" href="#" />,
  ];
  return (
    <NavbarLayout>
      <NavbarBreadCrumb list={list} />
    </NavbarLayout>
  );
};
