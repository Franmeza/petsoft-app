"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  optimisticPets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  currentGuests: number;
  handleChangePetSelectedId: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>;
  handleDeletePet: (petId: string) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);
function PetContextProvider({ data, children }: PetContextProviderProps) {
  //states
  const [optimisticPets, setOptimisticData] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, payload];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.selectedPetId
              ? { ...pet, ...payload.newPetData }
              : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived states
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const currentGuests = optimisticPets.length;

  //event handlers / actions
  const handleChangePetSelectedId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticData({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (
    selectedPetId: string,
    newPetData: Omit<Pet, "id">
  ) => {
    setOptimisticData({
      action: "edit",
      payload: { selectedPetId, newPetData },
    });
    // Call the editPet function with the selectedPetId and newPetData
    const error = await editPet(selectedPetId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleDeletePet = async (petId: string) => {
    setOptimisticData({ action: "delete", payload: petId });
    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
    // Reset the selected pet ID
    setSelectedPetId(null);
  };
  return (
    <PetContext.Provider
      value={{
        optimisticPets,
        selectedPetId,
        selectedPet,
        currentGuests,
        handleChangePetSelectedId,
        handleAddPet,
        handleEditPet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
