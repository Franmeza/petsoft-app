import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row items-center justify-center bg-[#5DC9A8] min-h-screen gap-10 p-6">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of member Dashboard"
        width={519}
        height={472}
      />
      <div>
        <Link href="/">
          <Image src={logo} alt="PetSoft logo" />
        </Link>

        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 space-x-3">
          {/* asChild atribute avoid accesibility issues by rendering only what's inside the botton. This way, wont be an anger tag inside a button */}
          <Button asChild>
            <Link href="/signup"> Get Started</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
