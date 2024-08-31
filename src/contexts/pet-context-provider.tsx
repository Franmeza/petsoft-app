"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  optimisticPets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  currentGuests: number;
  handleChangePetSelectedId: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleDeletePet: (petId: Pet["id"]) => Promise<void>;
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
  const handleChangePetSelectedId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticData({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (
    selectedPetId: Pet["id"],
    newPetData: PetEssentials
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

  const handleDeletePet = async (petId: Pet["id"]) => {
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
