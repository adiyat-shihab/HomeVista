"use client";

import SuccessAlert from "@/components/SuccessAlert/SuccessAlert";
import districts from "@/lib/districts";
import divisions from "@/lib/divisions";
import { useState } from "react";

const TestPage = () => {
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("");

  const onSelectDivisions = (value) => {
    setDivision(value);
  };

  const onSelectDistricts = (value) => {
    setDistrict(value);
  };

  // handle add property method
  const handleAddProperty = async (form) => {
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const title = form.get("title");
    const photoUrl1 = form.get("photoUrl1");
    const photoUrl2 = form.get("photoUrl2");
    const photoUrl3 = form.get("photoUrl3");
    const address = form.get("address");
    const price = form.get("price");
    const description = form.get("description");

    const formData = {
      name,
      email,
      phone: "+880" + phone,
      title,
      photoUrl1,
      photoUrl2,
      photoUrl3,
      division,
      district,
      address,
      price,
      description,
    };

    try {
      await fetch("/api/property", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      })
        .then((response) => {
          SuccessAlert("Property added");
        })
        .catch(() => SuccessAlert("Something went wrong"));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      data-theme="light"
      style={{
        backgroundImage: 'url("assets/Images/AddProperty/add-property.jpg")',
      }}
      className=" min-h-screen bg-cover flex py-10"
    >
      <div className="w-full flex justify-end items-center">
        <div className="p-10  bg-black bg-opacity-60 rounded-xl text-black  md:w-1/2 w-11/12 mx-auto">
          <h1 className="text-center text-white text-xl md:text-3xl md:mt-6">
            Add Property
          </h1>
          <form action={handleAddProperty} className="">
            {/* Name Field Start */}
            <div className="form-control">
              <label className="label  ">
                <span className="label-text  text-white">Name</span>
              </label>
              <input
                type="name"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            {/* Name Field End */}

            <div className="flex lg:flex-row flex-col gap-4">
              {/* Email Field start */}
              <div className="form-control w-full">
                <label className="label  ">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Email Field End */}

              {/* Contact number Field start */}
              <div className="form-control w-full ">
                <label className="label  ">
                  <span className="label-text text-white">Contact Number</span>
                </label>
                <div className="flex flex-row-reverse justify-center items-center bg-white rounded-lg">
                  <input
                    type="text"
                    name="phone"
                    placeholder="phone number"
                    className="input w-full"
                    required
                  />
                  <p className=" text-black mx-2">+880</p>
                </div>
                {/* Contact Field end */}
              </div>
            </div>

            {/* Property title Field Start */}
            <div className="form-control">
              <label className="label  ">
                <span className="label-text text-white">Property title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Property title"
                className="input input-bordered"
                required
              />
            </div>
            {/* Property title Field End */}

            {/* Enter Property photo link start */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* First property img link start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property photo url 1
                  </span>
                </label>
                <input
                  type="text"
                  name="photoUrl1"
                  placeholder="Property photo url"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* First property img link  end*/}

              {/* First property img link  start*/}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property photo url 2
                  </span>
                </label>
                <input
                  type="text"
                  name="photoUrl2"
                  placeholder="Property photo url"
                  className="input input-bordered"
                />
              </div>
              {/* First property img link end */}

              {/* First property img link start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property photo url 3
                  </span>
                </label>
                <input
                  type="text"
                  name="photoUrl3"
                  placeholder="Property photo url"
                  className="input input-bordered"
                />
              </div>
              {/* First property img link end */}
            </div>
            {/* Enter Property photo link end */}

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {/* Property divisions Field Start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property Divisions
                  </span>
                </label>
                <select
                  name=""
                  id=""
                  defaultValue={division}
                  className="select"
                  onChange={(e) => onSelectDivisions(e.target.value)}
                >
                  {divisions.map((division, index) => (
                    <option key={index}>{division}</option>
                  ))}
                </select>
              </div>
              {/* Property divisions Field End */}

              {/* Property districts Field Start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property Districts
                  </span>
                </label>
                <select
                  name=""
                  id=""
                  className="select"
                  onChange={(e) => onSelectDistricts(e.target.value)}
                >
                  {districts[division].map((district, index) => (
                    <option key={index}>{district}</option>
                  ))}
                </select>
              </div>
              {/* Property districts Field End */}
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {/* Property location Field Start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">
                    Property address
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Property address"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Property location Field End */}

              {/* Property Price Field Start */}
              <div className="form-control">
                <label className="label  ">
                  <span className="label-text text-white">Property Price</span>
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Property price"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Property price Field End */}
            </div>

            {/* Property description start*/}
            <div className="form-control">
              <label className="label  ">
                <span className="label-text text-white">
                  Property description
                </span>
              </label>
              <textarea
                rows="6"
                name="description"
                type="text"
                placeholder="description..."
                className="input-bordered p-4 border rounded-xl"
                required
              ></textarea>
            </div>
            {/* Property description end*/}

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Add property"
                className="btn bg-secondary hover:bg-blue-800 border-none text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
