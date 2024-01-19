"use client";

import DashboardTab from "@/containers/DashboardTab";
import { LoadingProvider } from "@/utils/LoadingContext";

const mummy = () => {
  return (
    <LoadingProvider>
      <main className="flex min-h-screen flex-col items-center py-8 gap-6">
        <DashboardTab person="mummy" />
      </main>
    </LoadingProvider>
  );
};

export default mummy;
