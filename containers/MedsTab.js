import MedicineTable from "@/components/MedicineTable";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";

export default function MedsTab({ person, meds }) {
  return (
    <>
      <section className="flex justify-between items-center w-80 font-bold text-2xl mb-2">
        <Link href="/">
          <button>
            <IoHomeSharp />
          </button>
        </Link>

        <h1>{person}</h1>
      </section>
      <section>
        <MedicineTable medicines={meds} />
      </section>
    </>
  );
}
