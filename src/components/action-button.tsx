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
  onClick?: () => void;
};

function ActionButton({
  children,
  variant,
  buttonSize,
  onClick,
}: ActionButtonProps) {
  return (
    <Button variant={variant} size={buttonSize} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ActionButton;
