"use client";
import usePetContext from "@/app/hooks/usePetContext";
import { cn } from "@/lib/utils";
import Image from "next/image";

function PetList() {
  const { pets, selectedPetId, handleChangePetSelectedId } = usePetContext();

  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn(
              "flex items-center cursor-pointer px-5 py-2 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition w-full",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              }
            )}
            onClick={() => handleChangePetSelectedId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet imgage"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PetList;
