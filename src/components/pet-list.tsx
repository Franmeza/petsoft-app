"use client";
import usePetContext from "@/app/hooks/usePetContext";
import useSearchContext from "@/app/hooks/useSearchContext";
import { cn } from "@/lib/utils";
import Image from "next/image";

function PetList() {
  const { pets, selectedPetId, handleChangePetSelectedId } = usePetContext();
  const { petSearch } = useSearchContext();

  const FilteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(petSearch)
  );

  return (
    <ul className="bg-white border-b border-light">
      {FilteredPets.map((pet) => (
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
