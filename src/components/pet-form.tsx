"use client";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import usePetContext from "@/app/hooks/usePetContext";
import { Pet } from "@/lib/types";
import PetFormBtn from "./pet-form-btn";

type PetFormProps = {
  actionType: string;
  onFormSubmssion: () => void;
};

function PetForm({ actionType, onFormSubmssion }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
  const { register } = useForm<Pet>();

  return (
    <>
      <form
        action={async (formData) => {
          onFormSubmssion();
          const petData = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            imageUrl:
              (formData.get("imageUrl") as string) ||
              "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
            age: Number(formData.get("age")),
            notes: formData.get("notes") as string,
          };
          if (actionType === "Add") {
            await handleAddPet(petData);
          } else if (actionType === "Edit") {
            await handleEditPet(selectedPet!.id, petData);
          }
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
