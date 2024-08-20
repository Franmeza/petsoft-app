"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  currentGuests: number;
  handleChangePetSelectedId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleEditPet: (petId: string, petEditedData: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);
function PetContextProvider({ data: pets, children }: PetContextProviderProps) {
  //states
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const currentGuests = pets.length;

  //event handlers / actions
  const handleChangePetSelectedId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  // const handleAddPet = async (newPet: Omit<Pet, "id">) => {
  //   // setPets((prev) => [...prev, { id: Date.now().toString(), ...newPet }]);
  //   await addPet(newPet);
  // };

  const handleEditPet = (petId: string, petEditedData: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          return {
            id: petId,
            ...petEditedData,
          };
        }
        return pet;
      })
    );
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        currentGuests,
        handleChangePetSelectedId,
        handleCheckoutPet,

        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
