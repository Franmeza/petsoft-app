import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/actions/user-actions";
import AuthFormBtn from "./auth-form-btn";

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
      <AuthFormBtn type={type} />
    </form>
  );
}

export default AuthForm;
