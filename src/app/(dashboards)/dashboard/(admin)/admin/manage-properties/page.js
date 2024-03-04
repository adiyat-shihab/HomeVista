"use client";
import ListPropertyAdmin from "@/components/admin-components/ListPropertyAdmin/ListPropertyAdmin";
import SearchForm from "@/components/ui-components/SearchForm/SearchForm";
import React from "react";
import useSWR from "swr";

const Page = ({ searchParams }) => {
  const url = `/api/properties?title=${searchParams.title}`;
  const { data, error, mutate } = useSWR(url, GetProperty); 
  
  if (data) {
    return (
      <>
        <SearchForm />
        <div className="flex">
          <div className="w-full h-[76vh] overflow-scroll">
            <ListPropertyAdmin refetch={mutate} data={data} />
          </div>
        </div>
      </>
    ); 
  }
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <span className="loading loading-bars loading-md"></span>
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
