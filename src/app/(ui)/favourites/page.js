"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FaEye } from "react-icons/fa6";
import { TbCurrencyTaka, TbHeartOff } from "react-icons/tb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useSWR from "swr";

const Favourites = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { uid } = useContext(authContext);
  const url = `/api/favourite?userId=${uid}`;
  const {
    data: favourites,
    isLoading,
    mutate: fetchFav,
  } = useSWR(url, GetFavouriteProperty);

  console.log(uid);
  console.log(url);
  console.log(favourites);

  const handleUnfavourite = (propertyId) => {
    fetch(`/api/favourite?propertyId=${propertyId}&userId=${uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          fetchFav();
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
          fetchFav();
        }
      });
  };

  console.log(favourites);

  return (
    <div className="my-6">
      {contextHolder}
      {favourites?.length !== 0 && !isLoading && (
        <h2 className="text-center text-3xl text-gray-500 my-6">
          Favourite Property
        </h2>
      )}
      {isLoading && (
        <div className="w-full min-h-[60vh] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="mx-4  md:mx-10 gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
        {!isLoading &&
          favourites != undefined &&
          favourites?.length !== 0 &&
          favourites?.map((property) => (
            <div key={property._id} className="my-4">
              <div className="card py-4 card-compact w-full bg-base-100 shadow-xl transform transition-transform duration-500 hover:scale-[1.03] hover:shadow-gray-200 hover:duration-500">
                <figure>
                  <div className="h-40 w-full relative z-0">
                    <Carousel
                      showThumbs={false}
                      autoPlay={true}
                      interval={2000}
                      infiniteLoop={true}
                    >
                      {property.image.map((imgSrc, index) => (
                        <div
                          key={index}
                          className="w-full h-40 carousel-image-container"
                        >
                          <Image
                            src={imgSrc}
                            fill
                            alt="Property Image"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </Carousel>
                    <div className="bottom-2   absolute z-10 w-full">
                      <div className="flex justify-between mx-2 ">
                        <p className="badge badge-sm bg-secondary border-none text-white p-4">
                          {property?.rentCheckbox ? "Rent" : "Sale"}
                        </p>
                        <p className="badge badge-sm bg-secondary border-none text-white p-4">
                          <TbCurrencyTaka />
                          {property.rentCheckbox
                            ? `${property?.price}/day`
                            : property?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </figure>

                <div className="flex flex-col">
                  <div className=" p-3">
                    <h2 className="text-md md:text-base">{property?.title}</h2>
                    <p className="text-sm text-gray-400">
                      {property?.area}, {property?.district},{" "}
                      {property?.division}
                    </p>
                  </div>
                  <p className="px-3 flex-grow mb-4 text-sm">
                    Area: {property?.size} (sqft)
                  </p>
                  <div className="flex flex-grow gap-2 justify-center">
                    <Link
                      href={`/properties/${property?._id}`}
                      className="btn btn-md bg-secondary hover:bg-blue-800 text-white"
                    >
                      <FaEye /> View
                    </Link>
                    <button
                      onClick={() => handleUnfavourite(property._id)}
                      className="btn btn-md bg-secondary hover:bg-blue-800 text-white"
                    >
                      <TbHeartOff /> Unfavourite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {favourites?.length === 0 && (
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className=" text-center text-red-400 md:text-3xl">
            No favoruite data
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;

const GetFavouriteProperty = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};
