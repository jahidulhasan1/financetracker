import { useUser } from "@clerk/clerk-react";
import React, { FormEvent, useState } from "react";
import { useCustomContext } from "../../contexts/financeContext";
enum categoryEn {
  Food = "Food",
  Rent = "Rent",
  Utilities = "Utilities",
  Entertainment = "Entertainment",
  Others = "Others",
}
enum paymentMethodEn {
  Credit = "Credit Card",
  Cash = "Cash",
  Bank = "Bank Transfer",
}
interface formData {
  userId: string;
  description: string;
  amount: number;
  category: categoryEn | "";
  paymentMethod: paymentMethodEn | "";
}
// Define initial state values
const initialFormData: formData = {
  userId: "",
  description: "",
  amount: 0,
  category: "",
  paymentMethod: "",
};

function DashboardForm() {
  const [data, setData] = useState<formData>(initialFormData);
  const { user } = useUser();
  console.log(user?.id);

  const { addRecord } = useCustomContext();
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    if (name === "amount") {
      setData((prevData) => ({
        ...prevData,
        [name]: parseFloat(value),
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // setData({ ...data, [e.target?.name]: e.target?.value });
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecord = {
      userId: user?.id,
      description: data.description,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      createdAt: new Date(),
    };

    setData(initialFormData);
    addRecord(newRecord);
  };

  return (
    <form onSubmit={handleForm} className=" p-3 text-left ">
      <label className="text-lg  ">
        Description :
        <input
          onChange={handleInput}
          name="description"
          type="text"
          value={data.description}
          required
          className="outline-none border w-[100%] mb-2 p-1 text-md"
          placeholder="Description"
        />
      </label>
      <label className="text-lg  ">
        Amount :
        <input
          onChange={handleInput}
          name="amount"
          type="number"
          value={data.amount}
          required
          className="outline-none border w-[100%] mb-2 p-1 text-md"
          placeholder="Description"
        />
      </label>
      <label className="block text-lg mb-2 ">
        {" "}
        Category :
        <select
          onChange={handleInput}
          name="category"
          value={data.category}
          className="outline-none block border w-full p-1 mt-2"
          required
        >
          <option value="">Select a Category</option>
          {Object.values(categoryEn).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="text-lg">
        payment Method :
        <select
          value={data.paymentMethod}
          onChange={handleInput}
          name="paymentMethod"
          className="outline-none block border w-full p-1  mt-2"
          required
        >
          <option value="">Select a Method</option>
          {Object.values(paymentMethodEn).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <button
        className="block mt-5 p-2 text-md font-medium 
      bg-sky-500 hover:bg-sky-700
        "
        type="submit"
      >
        Add Record
      </button>
    </form>
  );
}

export default DashboardForm;
