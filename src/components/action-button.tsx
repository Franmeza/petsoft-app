import { Button } from "./ui/button";

type ActionButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
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
  disabled,
  buttonSize,
  onClick,
}: ActionButtonProps) {
  return (
    <Button
      disabled={disabled}
      variant={variant}
      size={buttonSize}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ActionButton;
