"use client"
import ListProperty from "@/components/ListProperty/ListProperty";
import { data } from "autoprefixer";
import React from "react";
import useSWR from "swr";

const Page =  () => {
  const url = "/api/properties";
  const {data, error, mutate} = useSWR(url, GetProperty);
  if(data){
    return < ListProperty data={data} />;
  }
  return <h1>Loading...</h1>
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
