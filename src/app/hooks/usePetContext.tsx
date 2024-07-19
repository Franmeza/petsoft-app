import { PetContext } from "@/contexts/pet-context-provider";
import { useContext } from "react";

function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }
  return context;
}

export default usePetContext;
