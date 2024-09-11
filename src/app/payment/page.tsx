"use client";
import H1 from "@/components/h1";
import Image from "next/image";
import logo from "./../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import createCheckoutSession from "@/actions/payment-actions";

function Payment() {
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
          <H1 className="mb-10">PetSoft access requires payment</H1>
        </main>
        <Button
          onClick={async () => {
            await createCheckoutSession();
          }}
        >
          Bue lifetime access for $299
        </Button>
      </div>
    </div>
  );
}

export default Payment;
