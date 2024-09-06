import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "@/actions/user-actions";

type AuthFormProps = {
  type: "signUp" | "logIn";
};

function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === "logIn" ? logIn : signUp} className="min-w-[250px]">
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
      <Button className="mt-4" type="submit">
        {type === "logIn" ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}

export default AuthForm;
