import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login } from "@/actions/actions";

type AuthFormProps = {
  action: "Sign Up" | "Log In";
};

function AuthForm({ action }: AuthFormProps) {
  return (
    <form className="min-w-[250px]" action={login}>
      <div className="space-y-1 mb-2">
        <Label>Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="border-zinc-400"
        />
      </div>
      <div className="space-y-1">
        <Label>Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="border-zinc-400"
        />
      </div>
      <Button className="mt-4" type="submit">
        {action}
      </Button>
    </form>
  );
}

export default AuthForm;
