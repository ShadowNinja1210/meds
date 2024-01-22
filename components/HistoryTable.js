import dayjs from "dayjs";

const HistoryTable = ({ history }) => {
  return (
    <div style={{ width: "350px" }} className="flex flex-col gap-2 p-4 bg-gray-900 rounded-md font-semibold">
      <div className="flex justify-between w-full font-bold">
        <p style={{ width: "100px" }}>Start Date</p>
        <p style={{ width: "100px" }}>End Date</p>
        <p style={{ width: "60px" }}>Streak</p>
      </div>
      {history.map((item, index) => (
        <div key={index} className="flex justify-between items-center font-medium">
          <div style={{ width: "100px" }}>{dayjs(item.startDate).format("DD-MM-YYYY")}</div>
          <div style={{ width: "100px" }}>{dayjs(item.endDate).format("DD-MM-YYYY")}</div>
          <div style={{ width: "60px" }}>{dayjs(item.endDate).diff(dayjs(item.startDate), "day")}</div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTable;
