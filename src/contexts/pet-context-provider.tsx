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
    (state, newPet) => {
      return [...state, { ...newPet, id: crypto.randomUUID() }];
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
    setOptimisticData(newPet);
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
    const error = await editPet(selectedPetId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setOptimisticData((prev) =>
      prev.map((pet) =>
        pet.id === selectedPetId ? { ...pet, ...newPetData } : pet
      )
    );
  };

  const handleDeletePet = async (petId: string) => {
    await deletePet(petId);
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
