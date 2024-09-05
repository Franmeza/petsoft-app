import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <div className="bg-[#2C9676] h-[300px] absolute w-full -z-10 top-0" />
      <div className="flex flex-col max-w-[1050px] mx-auto px-5 min-h-screen">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Layout;
