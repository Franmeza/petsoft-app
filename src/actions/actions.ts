"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Pet } from "@/lib/types";

export async function addPet(newPet: Omit<Pet, "id">) {
  // Perform server-side logic
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }
  // Revalidate the cache for the '/app' path and the 'layout' key
  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, newPetData: Omit<Pet, "id">) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "Could not update pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return {
      message: "Could not delete pet",
    };
  }
  revalidatePath("/app", "layout");
}
