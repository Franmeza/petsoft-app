"use client";
import H1 from "@/components/h1";
import Image from "next/image";
import logo from "./../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import createCheckoutSession from "@/actions/payment-actions";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Payment({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, status, update } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center ">
        <Image
          className="mb-2"
          width={45}
          height={45}
          src={logo}
          alt="PetSoft logo"
        />
        <main>
          <H1 className="mb-10">
            {searchParams.success
              ? "Payment successful"
              : "PetSoft access requires payment"}
          </H1>
        </main>
        {searchParams.success && (
          <Button
            disabled={status === "loading" || session?.user.isSuscribed}
            onClick={async () => {
              await update(true);
              router.push("/app/dashboard");
            }}
          >
            Access PetSoft
          </Button>
        )}

        {!searchParams.success && (
          <Button
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                await createCheckoutSession();
              });
            }}
          >
            {isPending
              ? "Loading..."
              : "Buy lifetime access for $299 (this is stripe test mode account)"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Payment;
