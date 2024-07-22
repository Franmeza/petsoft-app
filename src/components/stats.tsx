"use client";

import usePetContext from "@/app/hooks/usePetContext";

function Stats() {
  const { currentGuests } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6 ">{currentGuests}</p>
      <p className="opacity-80">Current guests</p>
    </section>
  );
}

export default Stats;
