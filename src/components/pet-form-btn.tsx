import { Button } from "./ui/button";

function PetFormBtn({ actionType }: { actionType: string }) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType}
    </Button>
  );
}

export default PetFormBtn;
