import Link from "next/link";
import { GiMedicines } from "react-icons/gi";

const Dashboard = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 py-20">
      <section className="flex flex-col gap-10 items-center">
        <h1 className=" text-4xl font-bold">
          <span className=" text-yellow-500">Das</span>
          <span className=" text-cyan-500">hbo</span>
          <span className=" text-red-500">ard</span>
        </h1>
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f643/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f643/512.gif" alt="🙃" width="70" height="70" />
        </picture>
      </section>
      <section className="flex flex-col items-center gap-20 font-bold">
        <Link href="/dashboard/papa">
          <button className="px-4 py-2 text-lg rounded-lg border-4 text-yellow-400 border-yellow-500">Papa</button>
        </Link>
        <Link href="/dashboard/mamma">
          <button className="px-4 py-2 text-lg rounded-lg border-4 text-cyan-400 border-cyan-500">Mamma</button>
        </Link>
        <Link href="/dashboard/mummy">
          <button className="px-4 py-2 text-lg rounded-lg border-4 text-red-400 border-red-500">Mummy</button>
        </Link>
      </section>
      <Link href="/" className="text-8xl">
        <GiMedicines className=" text-gray-200 p-1" />
      </Link>
    </main>
  );
};

export default Dashboard;
