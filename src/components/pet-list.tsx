"use client";
import usePetContext from "@/app/hooks/usePetContext";
import Image from "next/image";

function PetList() {
  const { pets } = usePetContext();

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex items-center cursor-pointer px-5 py-2 text-base gap-3 hover:bg-[#EFF1F2] transition w-full">
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
