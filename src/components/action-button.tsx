import { forwardRef } from "react";
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

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, variant, disabled, buttonSize, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled}
        variant={variant}
        size={buttonSize}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
);
//For production to be reconognized as a named function
ActionButton.displayName = "ActionButton";
export default ActionButton;
