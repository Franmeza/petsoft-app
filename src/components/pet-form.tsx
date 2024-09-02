"use client";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import usePetContext from "@/app/hooks/usePetContext";
import PetFormBtn from "./pet-form-btn";
import { PetEssentials } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petFormSchema } from "@/lib/validations";

type PetFormProps = {
  actionType: string;
  onFormSubmssion: () => void;
};

function PetForm({ actionType, onFormSubmssion }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PetEssentials>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "Edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : {},
  });

  return (
    <>
      <form
        action={async () => {
          //Validate form fields before performing server actions
          const result = await trigger();
          if (!result) return;
          // Perform server-side logic
          onFormSubmssion();

          const petData = getValues();
          petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

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
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="owner Name" className="mt-5">
              Owner Name
            </Label>
            <Input id="ownerName" {...register("ownerName")} />
            {errors.ownerName && (
              <p className="text-red-500">{errors.ownerName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="imageUrl">Image Url</Label>
            <Input id="imageUrl" {...register("imageUrl")} />
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="age">Age</Label>
            <Input id="age" {...register("age")} />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...register("notes")} />
            {errors.notes ? (
              <p className="text-red-500">{errors.notes.message}</p>
            ) : null}
          </div>
        </div>
        <PetFormBtn actionType={actionType} />
      </form>
    </>
  );
}

export default PetForm;
