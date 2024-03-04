/* eslint-disable @next/next/no-img-element */
"use client";
import { message } from "antd";
import { TbCurrencyTaka } from "react-icons/tb";
import "./propertyStyle.css";
import Review from "@/components/ui-components/Review/Review";
import { CiMenuKebab } from "react-icons/ci";
import ReportProperty from "@/components/ui-components/ReportProperty/ReportProperty";
import React, { useContext, useEffect, useState } from "react";
import ResponsiveSlider from "@/components/ui-components/ResponsiveSlider/ResponsiveSlider";
import useSWR from "swr";
import { authContext } from "@/context/authContext/AuthProvider";
import AddToFav from "@/components/ui-components/AddToFav/AddToFav";
import HandleAddToCart from "@/components/ui-components/HandleAddToCart/HandleAddToCart";
import Likesbtn from "@/components/ui-components/Likesbtn/Likesbtn";
import Comments from "@/components/ui-components/Comments/Comments";
import {  FaComments,  FaRegComments } from "react-icons/fa";

const Page = ({ params }) => {
  const propertyId = params.propertyId;
  const { uid } = useContext(authContext);
  const [messageApi, contextHolder] = message.useMessage();

  const SingleUrl = `/api/properties/${propertyId}`;
  const ratingUrl = `/api/property-rating/${propertyId}`;
  const favUrl = `/api/favourite?userId=${uid}&propertyId=${propertyId}`;
  const likeUrl = `/api/like?userId=${uid}&propertyId=${propertyId}`;
  /* comments  */
  const [loading, setSubmitLoading] = useState(false);
  const [comment, setComment] = useState();
  const { currentUser } = useContext(authContext);
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);


  const url = "/api/comments";
  const { data, mutate } = useSWR(url, GetComments);

const handleShowComment = () => {

  setIsCommentsHidden((currValue)=>{
    return !currValue;
  })
}

  const handleComments = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    const date = new Date();
    const currentDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const data = {
      comment,
      propertyId,
      image: currentUser.photoURL,
      date: currentDate,
      email: currentUser.email,
      author: currentUser.displayName,
      userId: currentUser.uid,
    };
    if (comment == " ") {
      message.error("commet can not be empty");
      return;
    } else {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => console.log(res))
        .then(() => {
          setSubmitLoading(false);
          mutate();
          message.success("Successfully submitted");
          setComment(" ");
        });
    }
  };
  const {
    data: getRatingData,
    error,
    mutate: refetchRating,
  } = useSWR(ratingUrl, GetPropertyAverageRating);

  const {
    data: favData,
    isLoading: isFavDataLoading,
    isValidating: isFavDataValidating,
    mutate: refetchFav,
  } = useSWR(favUrl, getFav);

  
  const {
    data: likeData,
    isLoading: islikeDataLoading,
    isValidating: islikeDataValidating,
    mutate: refetchLike,
  } = useSWR(likeUrl, getLike);



  const handleLike = () => {
    if (likeData && likeData.isFound !== undefined) {
      fetch(likeUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.status === "ok") {
            messageApi.open({
              type: "success",
              content: resData.message,
            });
            refetchLike();
          }
        });
    }
  };

  const {
    data: SinglePropertyData,
    isLoading: isSinglePropertyLoading,
    isValidating: isSinglePropertyValidating,
    mutate: refetchSingleProperty,
  } = useSWR(SingleUrl, getSingleProperty);

  console.log(SinglePropertyData);

  const handleFav = () => {
    if (favData && favData.isFound !== undefined) {
      fetch(favUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.status === "ok") {
            messageApi.open({
              type: "success",
              content: resData.message,
            });
            refetchFav();
          }
        });
    }
  };

  //! handle Likse
  const [like, setLike] = useState(false);
  const handleLikse = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div>
      {!isSinglePropertyLoading && !isFavDataValidating ? (
        <div className="mx-2 lg:mx-40">
          {contextHolder}
          <div className="flex gap-4  justify-between items-center">
            {/* title */}
            <h2 className="text-xl font-bold mt-6 mb-2">
              {SinglePropertyData?.title}
            </h2>

            {/* Options */}
            <div className="relative dropdown">
              <div tabIndex={0} role="button" className="text-xl">
                <CiMenuKebab />
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content absolute menu-md top-0 right-5  w-56 rounded-box bg-white"
              >
                <ReportProperty
                  propertyId={propertyId}
                  author={SinglePropertyData?.author}
                />
              </ul>
            </div>
          </div>

          {/* Author, Date */}
          <div className="flex gap-2 text-center justify-between mb-4">
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {SinglePropertyData?.author}
            </p>
            <p className="font-semibold">{SinglePropertyData?.date}</p>
          </div>

          {/* Image slider */}
          <div>
            <ResponsiveSlider
              imgLinks={SinglePropertyData?.image}
              title={SinglePropertyData?.title}
            />
          </div>

          {/* price, address */}
          <div className="flex justify-between mt-6">
            <h2 className="text-gray-400 font-semibold">
              Location: {SinglePropertyData?.area},{" "}
              {SinglePropertyData?.district}, {SinglePropertyData?.division}
            </h2>

            <h2>
              <span className="badge text-xl p-4 bg-secondary text-white">
                <TbCurrencyTaka />
                {SinglePropertyData?.rentCheckbox
                  ? `${SinglePropertyData?.price}/day`
                  : SinglePropertyData?.price}
              </span>
            </h2>
          </div>

          {/* description of property */}
          <h2 className="font-bold text-3xl my-4">Description</h2>
          <p>{SinglePropertyData?.description}</p>

          <span className="divider"></span>

          {/* like, comments, favourite bar */}
          <p className="-mb-2 text-gray-400">
            {!islikeDataLoading && !islikeDataValidating && likeData
              ? likeData?.likeCount
              : "0"}{" "}
            likes, 0 comments and{" "}
            {!isFavDataLoading && !isFavDataValidating && favData
              ? favData?.favCount
              : "0"}{" "}
            favourites
          </p>

          <div className=" my-4 gap-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center text-xl">
            {/* likes */}
            <Likesbtn
              likeData={likeData}
              handleLike={handleLike}
              isLoading={islikeDataLoading}
              isValidating={islikeDataValidating}
            />

            {/* Comments button */}
            <button
              onClick={handleShowComment}
              className="btn disabled:text-white disabled:bg-secondary bg-secondary hover:bg-blue-800 text-white text-xl flex items-center justify-center gap-2 py-2"
            >
             {/* {isCommentsHidden ? <FaRegComments/> : <FaComments />}  Comments */}
              <FaComments />  Comments
            </button>

            {/* Add to Favourite */}
            <AddToFav
              favData={favData}
              handleFav={handleFav}
              isLoading={isFavDataLoading}
              isValidating={isFavDataValidating}
            />

            {/* Add to Cart */}
            <HandleAddToCart propertyData={SinglePropertyData} userId={uid} />
          </div>

          {/* comments section */}
          {!isCommentsHidden && (
            <>
              <from className="w-full mx-auto flex justify-center gap-4">
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  value={comment}
                  className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full  outline-none p-4 text-lg rounded-[0.125rem]"
                  required
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleComments}
                  className="btn btn-outline btn-primary"
                >
                  Comment
                </button>
              </from>
              <div>
                <Comments data={data} propertyId={propertyId} />
              </div>
            </>
          )}

          <div className="my-12">
            <Review
              propertyId={propertyId}
              rating={getRatingData}
              userId={uid}
              refetch={refetchRating}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full min-h-screen items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Page;

const GetPropertyAverageRating = async (ratingUrl) => {
  const res = await fetch(ratingUrl);
  const data = await res.json();
  return data.data;
};

const getFav = async (favUrl) => {
  const res = await fetch(favUrl, { cache: "no-cache" });
  const result = await res.json();
  return result;
};
const getLike = async (likeUrl) => {
  const res = await fetch(likeUrl, { cache: "no-cache" });
  const result = await res.json();
  return result;
};
const getSingleProperty = async (SingleUrl) => {
  const res = await fetch(SingleUrl, { cache: "no-cache" });
  const result = await res.json();
  return result.Properties;
};

const GetComments = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching comments", error);
    throw error; // Propagate the error
  }
};
