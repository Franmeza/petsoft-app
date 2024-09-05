import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function signUp(formData: FormData) {
  const password = await bcrypt.hash(formData.get("password") as string, 10);
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword: password,
    },
  });
  await signIn("credentials", formData);
}

export async function login(formData: FormData) {
  await signIn("credentials", formData);
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
