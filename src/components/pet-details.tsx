"use client";
import usePetContext from "@/app/hooks/usePetContext";
import Image from "next/image";
import ActionButton from "./action-button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import PetForm from "./pet-form";

function PetDetails() {
  const { selectedPet, handleCheckoutPet } = usePetContext();

  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <p className="text-2xl font-medium text-center my-auto">
          No Pet Selected
        </p>
      ) : (
        <>
          <div className="flex items-center bg-white px-8 py-5 border-b border-light">
            <Image
              src={selectedPet?.imageUrl}
              alt="Selected pet image"
              height={75}
              width={75}
              className="h-[75px] w-[75px] rounded-full object-cover"
            />
            <h2 className="text-3xl font-semibold leading-7 ml-5">
              {selectedPet?.name}
            </h2>
            <div className="ml-auto space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <ActionButton variant="secondary">Edit</ActionButton>
                </DialogTrigger>
                <PetForm title="Edit pet information" />
              </Dialog>

              <ActionButton
                variant="secondary"
                onClick={() => handleCheckoutPet(selectedPet.id)}
              >
                Checkout
              </ActionButton>
            </div>
          </div>
          <div className="flex justify-around px-5 py-10 text-center">
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                Owner name
              </h3>
              <p className="mt-1 text-lg text-zinc-800">
                {selectedPet?.ownerName}
              </p>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                age
              </h3>
              <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
            </div>
          </div>
          <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light flex-1">
            {selectedPet?.notes}
          </section>
        </>
      )}
    </section>
  );
}

export default PetDetails;
