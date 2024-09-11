"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/actions/user-actions";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "signUp" | "logIn";
};

function AuthForm({ type }: AuthFormProps) {
  //useFormState(action, error initial state) to catch errors from server actions
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

  return (
    <form
      action={type === "logIn" ? dispatchLogIn : dispatchSignUp}
      className="min-w-[250px]"
    >
      <div className="space-y-1 mb-2">
        <Label>Email</Label>
        <Input
          className="border-zinc-400"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Password</Label>
        <Input
          className="border-zinc-400"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <AuthFormBtn type={type} />
      {signUpError && (
        <p className="text-red-500 mt-2 text-sm">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 mt-2 text-sm">{logInError.message}</p>
      )}
    </form>
  );
}

export default AuthForm;
