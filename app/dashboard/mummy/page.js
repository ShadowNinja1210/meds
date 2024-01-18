import DashboardTab from "@/containers/DashboardTab";

const mummy = () => {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 gap-6">
      <DashboardTab person="mummy" />
    </main>
  );
};

export default mummy;
