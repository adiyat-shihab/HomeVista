/* eslint-disable @next/next/no-img-element */
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdCancel } from "react-icons/md";

const Page = () => {
  return (
    <div className="mx-6 md:mx-20 lg:mx-40">
      {/* page title */}
      <h2 className="text-3xl text-center font-bold my-6 ">Cart Items</h2>

      {/* total items, total cost */}
      <div className="flex justify-between">
        <p>
          <span className="font-semibold text-lg">Total Items:</span> {5}
        </p>
        <p className="flex items-center justify-center">
          <span className="font-semibold text-lg">Total Cost: </span>{" "}
          <TbCurrencyTaka />
          {500}
        </p>
      </div>

      <span className="divider"></span>

      {/* Tables */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td>
                <div className="font-bold">Hart Hagerty</div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>
                <span className="flex justify-center items-center">
                  <TbCurrencyTaka />
                  {500}
                </span>
              </td>
              <th>
                <button className="text-red-500 text-2xl">
                  <MdCancel />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <div className="text-center pb-20 mt-10">
          <button className="btn bg-secondary hover:bg-blue-800">Go to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
