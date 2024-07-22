import { Button } from "./ui/button";

type ActionButtonProps = {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize?: "default" | "lg" | "sm" | "icon";
};

function ActionButton({ children, variant, buttonSize }: ActionButtonProps) {
  return (
    <Button variant={variant} size={buttonSize}>
      {children}
    </Button>
  );
}

export default ActionButton;
