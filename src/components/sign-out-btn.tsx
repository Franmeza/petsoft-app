"use client";
import { logout } from "@/actions/user-actions";
import { Button } from "./ui/button";

function SignOutBtn() {
  return <Button onClick={async () => await logout()}>Sign Out</Button>;
}

export default SignOutBtn;
