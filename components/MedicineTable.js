import { BsCircleHalf, BsCircleFill } from "react-icons/bs";

const MedicineRow = ({ medicine, onTakeMedicine }) => {
  return medicine.map((medicine, index) => (
    <span
      key={index}
      className={`flex gap-4 ${medicine.taken ? "opacity-70" : "opacity-100"} ${
        medicine.postMeal ? "bg-slate-700" : "bg-slate-500"
      }`}
    >
      <span className="py-2 px-4 w-36 flex justify-start items-center">{medicine.name}</span>
      <span className="py-2 px-4 w-24 flex justify-center items-center">
        {medicine.amount == 1 ? <BsCircleFill className="text-white" /> : <BsCircleHalf className="text-white" />}
      </span>
      <span className="py-2 px-4 w-24 flex justify-start items-center">
        <button onClick={() => onTakeMedicine(medicine)} className="bg-gray-800 text-white px-2 py-1 rounded">
          Take
        </button>
      </span>
    </span>
  ));
};

const MedicineTable = ({ medicines, onTakeMedicine }) => {
  const morning = medicines.filter((medicine) => medicine.time === "Morning");
  const afternoon = medicines.filter((medicine) => medicine.time === "Afternoon");
  const night = medicines.filter((medicine) => medicine.time === "Night");

  return (
    <main className="flex flex-col gap-3 p-4 min-w-full bg-gray-900 rounded-lg">
      <section className="flex gap-4 bg-slate-700 rounded-lg font-bold">
        <span className="py-2 px-4 w-32 flex justify-start items-center">Name</span>
        <span className="py-2 px-4 w-24 flex justify-start items-center">Amount</span>
        <span className="py-2 px-4 w-24 flex justify-start items-center">Actions</span>
      </section>

      <section className="flex flex-col gap-4">
        {/* Morning */}
        <div className="">
          {morning.length > 0 && (
            <>
              <picture>
                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f305/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f305/512.gif"
                  alt="🌅"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow medicine={morning} time="Morning" onTakeMedicine={onTakeMedicine} />
            </>
          )}
        </div>

        {/* Afternoon */}
        <div className="">
          {afternoon.length > 0 && (
            <>
              <picture>
                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.gif"
                  alt="😎"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow medicine={afternoon} time="Afternoon" onTakeMedicine={onTakeMedicine} />
            </>
          )}
        </div>

        {/* Night */}
        <div className="flex flex-col">
          {night.length > 0 && (
            <>
              <picture>
                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31c/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31c/512.gif"
                  alt="🌜"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow medicine={night} time="Night" onTakeMedicine={onTakeMedicine} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default MedicineTable;
