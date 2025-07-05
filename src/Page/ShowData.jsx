import React from "react";

const ShowData = ({ data }) => {
  console.log(data);

  const { title, amount, date, category } = data;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-sm border border-gray-400 gap-10 ">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{title}</h2>
            <span className="text-xl">Amount: {amount} TK</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{date}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{category}</span>
            </li>
          </ul>
 
        </div>
      </div>
    </div>
  );
};

export default ShowData;
