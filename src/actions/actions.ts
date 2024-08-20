"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Perform server-side logic
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        age: parseInt(formData.get("age")),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        notes: formData.get("notes"),
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

export async function editPet(petId: string, formData) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        age: parseInt(formData.get("age")),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        notes: formData.get("notes"),
      },
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
