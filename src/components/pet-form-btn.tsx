import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function PetFormBtn({ actionType }) {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-5 self-end" type="submit" disabled={pending}>
      {actionType}
    </Button>
  );
}

export default PetFormBtn;
