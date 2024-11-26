import {
  NavbarBreadCrumb,
  NavbarHomeItem,
  NavbarLayout,
} from "@/components/NavBar";
import React from "react";

export const FolderListNavbar: React.FC = () => {
  const list = [<NavbarHomeItem key="home" />];
  return (
    <NavbarLayout>
      <NavbarBreadCrumb list={list} />
    </NavbarLayout>
  );
};
