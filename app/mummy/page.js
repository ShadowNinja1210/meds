"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MedsTab from "@/containers/MedsTab";

dayjs.extend(utc);

export default function Mummy() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8">
      <MedsTab person="Mummy" />
    </main>
  );
}
