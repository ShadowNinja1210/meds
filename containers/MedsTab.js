import CalendarDate from "@/components/CalendarDate";
import MedicineTable from "@/components/MedicineTable";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";

const MedsTab = ({ person, meds }) => {
  const color = () => {
    switch (person) {
      case "Papa":
        return "rgb(234 179 8)";
      case "Mamma":
        return "rgb(6 182 212)";
      case "Mummy":
        return "rgb(239 68 68)";
      default:
        return "yellow";
    }
  };

  return (
    <>
      <section
        style={{
          fontSize: "2rem",
          lineHeight: "2rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "20rem",
          marginBottom: "0.5rem",
          color: color(),
        }}
      >
        <Link href="/">
          <button>
            <IoHomeSharp />
          </button>
        </Link>

        <h1
          style={{
            padding: "2px 6px",
            fontSize: "1.35rem",
            borderRadius: "6px",
            border: `solid 4px ${color()}`,
            color: color(),
          }}
        >
          {person}
        </h1>
      </section>

      <section>
        <CalendarDate />
      </section>

      <section>
        <MedicineTable medicines={meds} person={person} />
      </section>
    </>
  );
};

export default MedsTab;
