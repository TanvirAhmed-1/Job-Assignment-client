import { useEffect, useState } from "react";
import axios from "axios";
import ShowData from "./ShowData";

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = ["All", "food", "Travel", "Entertainment", "Bills", "others"];

  // Filter logic
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((v) => v.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Show All Data</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by Category:</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat,index) => (
            <button
              key={index}

              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border  text-black bg-sky-400 rounded-xl  ${
                selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {/* {cat} */}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((v) => <ShowData key={v._id} data={v} />)
        ) : (
          <p className="min-h-screen bg-black text-red-500">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
