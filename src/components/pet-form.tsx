"use client";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import usePetContext from "@/app/hooks/usePetContext";
import { Pet } from "@/lib/types";
import { addPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: string;
  onFormSubmssion: () => void;
};

function PetForm({ actionType, onFormSubmssion }: PetFormProps) {
  const { selectedPet } = usePetContext();
  const { register } = useForm<Pet>();

  return (
    <>
      <form
        action={async (formData) => {
          const error = await addPet(formData);
          if (error) {
            toast.warning(error.message);
            return;
          }
          onFormSubmssion();
        }}
        className="flex flex-col"
      >
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
        <PetFormBtn actionType={actionType} />
      </form>
    </>
  );
}

export default PetForm;
