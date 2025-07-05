import { useEffect, useState } from "react";
import axios from "axios";
import ShowData from "./ShowData";
import { Link } from "react-router-dom";

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/expenses")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categories = [
    "All",
    "Food",
    "Travel",
    "Entertainment",
    "Bills",
    "Others",
  ];

  // Extract years from data dynamically
  const years = [
    "All",
    ...Array.from(
      new Set(data.map((item) => new Date(item.date).getFullYear().toString()))
    ),
  ];

  const months = [
    "All",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  // Filter logic with category, year, and month
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const itemYear = itemDate.getFullYear().toString();
    const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");

    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchYear = selectedYear === "All" || itemYear === selectedYear;
    const matchMonth = selectedMonth === "All" || itemMonth === selectedMonth;

    return matchCategory && matchYear && matchMonth;
  });

  const sumData = filteredData.reduce(
    (sum, v) => sum + parseFloat(v.amount),
    0
  );

  const TotalSum = data.reduce((sum, v) => sum + parseFloat(v.amount), 0);

  const highestPriceItem =
    filteredData.length > 0
      ? filteredData.reduce(
          (max, item) =>
            parseFloat(item.amount) > parseFloat(max.amount) ? item : max,
          filteredData[0]
        )
      : null;

  return (
    <div className="flex w-10/12 mx-auto">
      <div className="min-h-screen w-full bg-gray-300 p-4">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 justify-center text-xl text-black">
          <Link
            to={"/expense"}
            className="py-2 px-4 rounded-xl bg-sky-300 hover:bg-sky-500"
          >
            Add Expense
          </Link>
          <Link
            to={"/expenseData"}
            className="py-2 px-4 rounded-xl bg-sky-300 hover:bg-sky-500"
          >
            Show Expense
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-black text-center py-10">
          Show All Data
        </h1>

        {/* Filters: Category, Year, Month */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          {/* Category Filter Buttons */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center text-black">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border text-black rounded-xl ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Year */}
          <div>
            <h2 className="text-xl  mb-2 text-start text-black">Year</h2>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-xl border text-black bg-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div>
            <h2 className="text-xl  mb-2 text-center text-black">Month</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 rounded-xl border text-black bg-white"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month === "All" ? "All Months" : `Month ${month}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Boxes */}
        <div className="flex items-center gap-6 justify-center py-10 flex-wrap">
          {/* Total Expense (all data) */}
          <div className="border border-purple-200 h-44 w-96 bg-green-400 p-6 rounded-2xl text-black">
            <div className="flex gap-4 flex-col">
              <p className="text-xl text-black font-semibold">Total Expenses</p>
              <p>{TotalSum} Tk</p>
            </div>
          </div>

          {/* Highest Expense from filtered data */}
          <div className="border border-purple-200 w-96 h-44 bg-yellow-400 p-6 rounded-2xl text-black">
            <div className="flex gap-4 flex-col">
              <p className="text-xl text-black font-semibold">
                Highest Expense
              </p>
              {highestPriceItem ? (
                <>
                  <p>
                    <strong>Category:</strong> {highestPriceItem.category}
                  </p>
                  <p>
                    <strong>Title:</strong> {highestPriceItem.title}
                  </p>
                </>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((v) => <ShowData key={v._id} data={v} />)
          ) : (
            <div className="flex justify-center items-center w-11/12 mx-auto h-64">
              <p className="text-red-500 text-2xl text-center">
                No data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
