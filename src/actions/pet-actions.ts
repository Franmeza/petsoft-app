"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { petFormSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/server-utils";

export async function addPet(newPet: PetEssentials) {
  // authentication check
  const session = await checkAuth();
  //validations
  const validatedPetData = petFormSchema.safeParse(newPet);

  if (!validatedPetData.success) {
    return {
      message: "Invalid pet data",
    };
  }
  // Save the new pet to the database
  try {
    await prisma.pet.create({
      data: {
        ...validatedPetData.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }
  // Revalidate the cache for the '/app' path and the 'layout' key
  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  // authentication check
  const session = await checkAuth();
  //validations
  const validatedPetData = petFormSchema.safeParse(newPetData);
  if (!validatedPetData.success) {
    return {
      message: "Invalid pet data",
    };
  }
  //authorization check
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
    select: { userId: true },
  });
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }
  // Update the pet in the database
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: validatedPetData.data,
    });
  } catch (error) {
    return {
      message: "Could not update pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: Pet["id"]) {
  //authentication check
  const session = await checkAuth();
  //authorization check
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
    select: { userId: true },
  });
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
    };
  }
  // Delete the pet from the database
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
