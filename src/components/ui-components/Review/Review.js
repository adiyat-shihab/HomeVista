"use client";

import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Modal from "react-modal";
import StarRatings from "react-star-ratings";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import useSWR from "swr";

const Review = ({ propertyId, rating, refetch, userId }) => {
  const url = `/api/property-rating?propertyId=${propertyId}&userId=${userId}`;

  const { data, error, mutate } = useSWR(url, getRatingByUser);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [initialRating, setInitialRating] = useState(0);

  useEffect(() => {
    setInitialRating(data);
  }, [data]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async () => {
    const ratingData = {
      userId,
      propertyId,
      rating: initialRating,
    };

    try {
      await fetch(`/api/property-rating`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      }).then(() => {
        SuccessAlert("Rating submited");
        refetch();
        closeModal();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex mb-6 justify-center items-center flex-col gap-4">
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
        />

        {/* Rating button */}
        <button
          className="btn bg-secondary hover:bg-blue-800 text-white"
          onClick={openModal}
        >
          Give Rating
        </button>
      </div>

      {/* Modal is here */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="border-2 w-1/3 h-1/3 bg-white left-1/2 top-1/2 absolute -translate-y-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col  items-end">
          <button className="m-4 text-3xl text-red-600" onClick={closeModal}>
            <MdCancel />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <StarRatings
            rating={initialRating}
            starRatedColor="orange"
            changeRating={(rating) => {
              setInitialRating(rating);
            }}
            numberOfStars={5}
            name="rating"
          />
          <button
            onClick={handleSubmit}
            className="mt-6 btn bg-secondary text-white hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Review;

const getRatingByUser = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  return data.data;
};
