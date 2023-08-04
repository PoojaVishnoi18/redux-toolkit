import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import "./App.css";

import {
  addReimburse,
  deleteReimburse,
  setReimburse,
  completedReimburse,
  updatedReimburse,
  setSelectedReimburse,
  fetchReimburse,
  resetSelectedReimbursement,
} from "./store/reducers/reimburse";
import { fetchUser } from "./store/reducers/user";

import {
  selectSelectedReimburse,
  selectReimburseList,
} from "./store/selectors/reimburse";
import { selectUserList } from "./store/selectors/user";

import { CURRENCY } from "./constants";

function App() {
  const dispatch = useDispatch();

  const users = useSelector(selectUserList);
  const reimburseList = useSelector(selectReimburseList);
  const selectedReimburse = useSelector(selectSelectedReimburse);

  const [reimburse, setReimburse] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [user, setUser] = useState("1");

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchReimburse());
  }, []);

  useEffect(() => {
    setReimburse(selectedReimburse?.text);
    setAmount(selectedReimburse?.amount);
    if(selectedReimburse?.currency === undefined){
      setCurrency("INR")
    }else{ setCurrency(selectedReimburse.currency)}

    if(selectedReimburse?.user === undefined){
      setUser("1")
    }else{ setUser(selectedReimburse.user)}


  }, [selectedReimburse]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !reimburse ||
      !currency ||
      !user ||
      !amount ||
      reimburse === "" ||
      amount === "" ||
      currency === "" ||
      user === ""
    ) {
      alert("Empty values");
    } else {
      const reimburseSelected = reimburseList.find((item) => {
        return item?.id === parseInt(selectedReimburse?.id);
      });

      if (reimburseSelected) {
        dispatch(
          updatedReimburse({
            id: reimburseSelected.id,
            data: {
              text: reimburse,
              amount: amount,
              currency: currency,
              user: parseInt(user, 10),
              completed: false,
            },
          })
        );
      } else {
        dispatch(
          addReimburse({
            id: Date.now(),
            text: reimburse,
            amount: amount,
            currency: currency,
            user: user,
            completed: false,
          })
        );
      }
      console.log("hi");
      dispatch(resetSelectedReimbursement);
      setReimburse("");
      setAmount("");
      setCurrency("INR");
      setUser("1");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteReimburse(id));
  };

  const handleCompleted = (id) => {
    dispatch(completedReimburse(id));
  };

  const handleUpdate = (id) => {

    dispatch(setSelectedReimburse(id));
    dispatch(deleteReimburse(id));

  };

  return (
    <div className="">
      <div className=" text-center text-lg p-10">React redux toolkit</div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Enter the title"
              className="border border-1 p-2 w-[20rem] rounded-lg border-rose-200"
              onChange={(e) => setReimburse(e.target.value)}
              value={reimburse}
            />
            <input
              type="number"
              placeholder="Enter the amount"
              className="border border-1 p-2 w-[20rem] rounded-lg border-rose-200"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-1 p-2 w-[20rem] rounded-lg border-rose-200"
            >
              {CURRENCY.map((curr) => {
                return (
                  <option key={curr.label} value={curr.value}>
                    {curr.label}
                  </option>
                );
              })}
            </select>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="border border-1 p-2 w-[20rem] rounded-lg border-rose-200"
            >
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                );
              })}
            </select>

            <button
              type="submit"
              className=" bg-slate-200 px-4 py-2 rounded-lg text-sm mt-4 "
            >
              Submit
            </button>
          </div>
        </form>

        <div className=" my-8 mx-40 p-4">
          <h1 className="text-lg text-center">Reimbursement List</h1>
          <div className="flex flex-wrap gap-5 justify-start py-4">
            {reimburseList.map((item) => (
              <div key={item.id} className="bg-rose-50 p-4 rounded-lg text-sm">
                <div>
                  <span className="font-medium">Title</span> - {item.text}
                </div>
                <div>
                  <span className="font-medium">Amount</span> - {item.amount}{" "}
                  {item.currency}
                </div>
                <div>
                  <span className="font-medium">User</span> -{" "}
                  {
                    users.find(
                      (data) =>
                        parseInt(data?.id, 10) === parseInt(item?.user, 10)
                    )?.fullName
                  }
                </div>
                <div className="mt-4 flex justify-between items-center gap-4">
                  <div
                    className={`${
                      item.completed ? "text-green-400" : " hidden"
                    }`}
                  >
                    Completed
                  </div>
                  <button
                    onClick={() => handleCompleted(item.id)}
                    className={`${
                      item.completed
                        ? "hidden"
                        : " p-1 border rounded-lg text-xs b-2 border-gray-400 "
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    disabled={item.completed}
                    onClick={() => handleUpdate(item.id)}
                    className={`${
                      item.completed ? "text-gray-300 border-gray-300" : ""
                    }  p-1 border rounded-lg text-xs b-2  border-gray-400`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className=" p-1 border rounded-lg text-xs b-2 border-gray-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
