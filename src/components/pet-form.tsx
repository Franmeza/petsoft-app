"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import usePetContext from "@/app/hooks/usePetContext";
import { Pet } from "@/lib/types";

// type Inputs = {
//   name: string;
//   age: number;
//   ownerName: string;
//   notes: string;
//   imageUrl: string;
//   id: string;
// };
type PetFormProps = {
  actionType: string;
  onFormSubmssion: () => void;
};

function PetForm({ actionType, onFormSubmssion }: PetFormProps) {
  const { handleEditPet, handleAddPet, selectedPet } = usePetContext();
  const { register, handleSubmit } = useForm<Pet>();

  const onSubmit: SubmitHandler<Pet> = (data) => {
    if (actionType === "Add") {
      handleAddPet(data);
    } else if (actionType === "Edit") {
      handleEditPet(selectedPet!.id, data);
    }
    onFormSubmssion();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              defaultValue={actionType === "Edit" ? selectedPet?.name : ""}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="owner Name" className="mt-5">
              Owner Name
            </Label>
            <Input
              id="ownerName"
              type="text"
              {...register("ownerName")}
              defaultValue={actionType === "Edit" ? selectedPet?.ownerName : ""}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="imageUrl">Image Url</Label>
            <Input
              id="imageUrl"
              type="text"
              {...register("imageUrl")}
              defaultValue={actionType === "Edit" ? selectedPet?.imageUrl : ""}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age")}
              defaultValue={actionType === "Edit" ? selectedPet?.age : ""}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              {...register("notes")}
              defaultValue={actionType === "Edit" ? selectedPet?.notes : ""}
            />
          </div>
        </div>

        <Button className="mt-5 self-end" type="submit">
          {actionType}
        </Button>
      </form>
    </>
  );
}

export default PetForm;
