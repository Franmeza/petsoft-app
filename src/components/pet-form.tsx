import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function PetForm({ title }: { title: string }) {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {title}</DialogTitle>
        </DialogHeader>
        <form>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </form>
      </DialogContent>
    </>
  );
}

export default PetForm;
