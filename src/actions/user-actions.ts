"use server";

import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { authSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";

export async function signUp(formData: unknown) {
  //check if formData is valid
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  //validation
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedData = await authSchema.safeParseAsync(formDataObject);

  if (!validatedData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "User already exists",
        };
      }
    }
    return {
      message: "Something went wrong",
    };
  }

  await signIn("credentials", formData);
}

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  await signIn("credentials", formData);
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
