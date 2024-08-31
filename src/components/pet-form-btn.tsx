import { Button } from "./ui/button";

function PetFormBtn({ actionType }: { actionType: string }) {
  return (
    <Button className="mt-5 self-end" type="submit">
      {actionType}
    </Button>
  );
}

export default PetFormBtn;
