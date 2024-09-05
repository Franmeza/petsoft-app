"use client";
import { logout } from "@/actions/user-actions";
import { Button } from "./ui/button";

function SignOutBtn() {
  return (
    <Button onClick={async () => await logout()}>Sign Out</Button> // botón para cerrar sesión
  );
}

export default SignOutBtn;
