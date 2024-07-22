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
};

export const PetContext = createContext<TPetContext | null>(null);
function PetContextProvider({ data, children }: PetContextProviderProps) {
  //states
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  //derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const currentGuests = pets.length;

  //event handlers / actions
  const handleChangePetSelectedId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        currentGuests,
        handleChangePetSelectedId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
