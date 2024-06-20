import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout({ loggedUser, isLoading }) {
  return (
    <>
      <NavBar loggedUser={loggedUser} isLoading={isLoading} />
      <Outlet />
    </>
  );
}
