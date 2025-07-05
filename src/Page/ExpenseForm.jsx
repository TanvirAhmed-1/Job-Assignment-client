import axios from "axios";
import { Link } from "react-router-dom";

const ExpenseForm = () => {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const amount = form.amount.value;
    const rawDate = new Date(form.date.value);
    const date = `${String(rawDate.getDate()).padStart(2, "0")}-${String(
      rawDate.getMonth() + 1
    ).padStart(2, "0")}-${rawDate.getFullYear()}`;
    const category = form.category.value;

    const sendData = {
      title,
      amount,
      date,
      category,
    };
    console.log(sendData);
    try {
      const res = await axios.post("http://localhost:5000/expenses", sendData);

      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-white pt-20">
        <div className=" flex items-center gap-4 justify-center text-xl text-black ">
            <Link to={"/expense"} className="py-2 px-4 rounded-xl bg-sky-300 hover:bg-sky-500"> Add Expense</Link>
            <Link to={"/expenseData"} className="py-2 px-4 rounded-xl bg-sky-300 hover:bg-sky-500"> Show Expense</Link>

        </div>
      <h1 className="text-2xl text-center font-semibold text-black py-20">
        {" "}
        Add new Expense
      </h1>
      <div className="flex justify-center items-center bg-gray-300 w-1/3 mx-auto p-20 rounded-xl  ">
        <form action="" onSubmit={HandleSubmit}>
          <div className="text-sm flex flex-col justify-center items-start">
            <label className=" text-sm text-black py-2"> Enter Title</label>
            <input
              type="text"
              className="p-2 rounded-xl border-sky-400 placeholder:text-white w-full"
              name="title"
              id=""
              placeholder="Title"
            />
          </div>

          <div className="text-sm flex flex-col justify-center items-start ">
            <label className=" text-sm text-black py-2"> Enter Amount</label>
            <input
              type="number"
              className="p-2 rounded-xl border-sky-400 placeholder:text-white  w-full"
              name="amount"
              id=""
              placeholder="Amount"
            />
          </div>

          <div className="text-sm flex flex-col justify-center items-start">
            <label className=" text-sm text-black py-2"> Enter Date</label>
            <input
              type="date"
              className="p-2 rounded-xl border-sky-400 placeholder:text-white"
              name="date"
              id=""
              placeholder="Amount"
            />
          </div>

          <div className="text-sm flex flex-col justify-center items-start">
            <label className=" text-sm text-black py-2"> Enter Category</label>
            <select
              className="p-2 rounded-xl border-sky-400 w-full"
              name="category"
              id=""
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button className="text-lg bg-sky-400 hover:bg-sky-600 rounded-xl py-2 px-4 w-full mt-6 ">
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
