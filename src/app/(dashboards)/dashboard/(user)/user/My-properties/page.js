"use client";
import ListProperty from "@/components/ui-components/ListProperty/ListProperty";
import SearchForm from "@/components/ui-components/SearchForm/SearchForm";
import { authContext } from "@/context/authContext/AuthProvider";
import React, { useContext } from "react";
import useSWR from "swr";

const Page = ({ searchParams }) => {
  const { currentUser } = useContext(authContext);

  const url = `/api/properties?title=${searchParams.title}`;
  const { data, error, mutate } = useSWR(url, GetProperty);
  let userData = []; // Declare userData variable

  if (data) {
    // Filter data based on currentUser email
    userData = data.filter(property => property.email === currentUser.email);
  }
  if (userData) {
    return (
      <>
        <SearchForm />
        <div className="flex">
          <div className="w-10/12">
            <ListProperty data={userData} />
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
