"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MedsTab from "@/containers/MedsTab";
import { LoadingProvider } from "@/utils/LoadingContext";

dayjs.extend(utc);

export default function Papa() {
  return (
    <LoadingProvider>
      <main className="flex min-h-screen flex-col items-center py-8">
        <MedsTab person="Papa" />
      </main>
    </LoadingProvider>
  );
}
