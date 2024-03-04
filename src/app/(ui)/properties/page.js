"use client";
import ListProperty from "@/components/ui-components/ListProperty/ListProperty";
import SearchForm from "@/components/ui-components/SearchForm/SearchForm";
import districtsData from "@/lib/add-property-districts";
import divisions from "@/lib/add-property-divisions";
import { Select } from "antd";
import React, { useState } from "react";
import useSWR from "swr";

const Page = ({ searchParams }) => {
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState();
  const [type, setType] = useState();
  const url = `/api/properties?title=${searchParams.title}`;
  const { data, error, mutate } = useSWR(url, GetProperty);
  if (data) {
    return (
      <>
        <div className="flex mx-6 justify-center">
          <SearchForm />
        </div>
        <div className="flex justify-center md:flex-row flex-col">
          <div className="w-2/12 md:flex flex-col px-5 gap-3">
            <div>
              <h1 className="border-b-2 pb-1">Type</h1>
              <div className="ml-4 mt-1">
                <label htmlFor="option1">
                  <input
                    type="radio"
                    id="option1"
                    name="radioGroup"
                    value="Rent"
                    onChange={() => setType("Rent")} // Update type state
                  />{" "}
                  Rent
                </label>
                <br />
                <label htmlFor="option2">
                  <input
                    type="radio"
                    id="option2"
                    name="radioGroup"
                    value="Sell"
                    onChange={() => setType("Sell")} // Update type state
                  />{" "}
                  Sell
                </label>
              </div>
            </div>
            <div>
              <h4
                className={
                  "border-b-2 pb-1 mb-2 text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                }
              >
                Division
              </h4>

              <Select
                defaultValue={division}
                style={{ width: 120 }}
                options={divisions}
                onChange={(value) => {
                  setDistrict("");
                  setArea("");
                  setDivision(value);
                }}
              />
            </div>
            <div>
              <h4
                className={
                  " border-b-2 pb-1 mb-2 text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                }
              >
                District
              </h4>

              <Select
                style={{ width: 120 }}
                options={districtsData[division]}
                value={district}
                onChange={async (value) => {
                  setLoading(true);
                  setArea("");
                  setPlace([]);
                  setDistrict(value);
                  const where = encodeURIComponent(
                    JSON.stringify({
                      adminName2: value,
                    })
                  );
                  const data = await fetch(
                    `https://parseapi.back4app.com/classes/BD?where=${where}`,
                    {
                      headers: {
                        "X-Parse-Application-Id":
                          "zS2XAEVEZAkD081UmEECFq22mAjIvX2IlTYaQfai",
                        "X-Parse-Master-Key":
                          "t6EjVCUOwutr1ruorlXNsH3Rz65g0jiVtbILtAYU",
                      },
                    }
                  ).then((res) => {
                    setLoading(false);
                    return res.json();
                  });

                  const updatedPlace = [];
                  data.results.map((item) => {
                    const exist = updatedPlace.find(
                      (data) => data.value === item.adminName3
                    );
                    if (!exist) {
                      updatedPlace.push({
                        value: item.adminName3,
                        label: item.adminName3,
                      });
                    }
                  });
                  setPlace(updatedPlace);
                }}
              />
            </div>
          </div>
          <div className=" mb-4 w-full md:w-10/12">
            <ListProperty data={data} />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default Page;

const GetProperty = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching properties", error);
    throw error; // Propagate the error
  }
};
