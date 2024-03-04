"use client";
import { message } from "antd";
import Link from "next/link";
import React from "react";
import { BsCheck, BsEye } from "react-icons/bs";
import { FcRight } from "react-icons/fc";
import useSWR from "swr";

const Page = () => {
  const reportUrl = `/api/get-all-report`;
  const {
    data: allReportData,
    isLoading,
    mutate,
  } = useSWR(reportUrl, getAllReport);

  console.log(allReportData?.data);

  const handleResovled = (data) => {
    fetch(
      `/api/property-report?propertyId=${data.propertyId}&reporterId=${data.reporterId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.deletedCount === 1) {
          message.success("Report is resovled");
          mutate();
        }
      });
  };

  return (
    <div className="min-h-[70vh] overflow-y-scroll">
      <div className="grid  md:grid-cols-2 grid-cols-1 gap-2 m-4">
        {!isLoading &&
          allReportData.data.map((data) => (
            <div key={data._id} className="card border-2  shadow-xl">
              <div className="card-body">
                <h2 className="md:text-xl text-lg font-semibold">
                  {data.propertyData.title}
                </h2>
                <p className="h-36 overflow-y-scroll">{data.report}</p>
                <div className="card-actions mt-4 justify-center ">
                  <Link
                    href={`/dashboard/admin/manage-properties?title=${data.propertyData.title}`}
                    className="btn btn-primary btn-md"
                  >
                    {" "}
                    <BsEye /> Resovle
                  </Link>
                  <button
                    onClick={() => handleResovled(data)}
                    className="btn  btn-primary btn-md"
                  >
                    <BsCheck className="text-2xl" /> Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;



const getAllReport = async (reportUrl) => {
  const res = await fetch(reportUrl, {"cache": "no-cache"});
  const data = res.json();
  return data;
};
