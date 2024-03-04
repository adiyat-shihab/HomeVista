"use client";


import React, { useEffect } from 'react'
import { LuHeart, LuHeartOff } from "react-icons/lu";


const AddToFav = ({ handleFav, favData, isLoading, isValidating }) => {

  return (
    <>
      <button
        onClick={handleFav}
        className="btn disabled:text-white disabled:bg-secondary bg-secondary hover:bg-blue-800 text-white text-xl flex items-center justify-center gap-2 py-2"
        disabled={isLoading || isValidating} // Disable button while loading
      >
        {isLoading || isValidating ? ( // Show loading spinner if data is loading
          <div>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <>
            {favData && favData.isFound ? (
              <>
                <LuHeartOff /> Unfavourite{" "}
              </>
            ) : (
              <>
                <LuHeart /> Favourite
              </>
            )}
          </>
        )}
      </button>

    </>
  )
}



export default AddToFav;
