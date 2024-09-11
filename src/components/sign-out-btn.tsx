"use client";
import { logout } from "@/actions/user-actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await logout();
        });
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}

export default SignOutBtn;
