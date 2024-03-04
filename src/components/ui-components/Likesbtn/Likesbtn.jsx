
"use client";


import React, { useEffect } from 'react'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";


const Likesbtn = ({ handleLike, likeData, isLoading, isValidating }) => {

    return (
        <>
            <button
                onClick={handleLike}
                className="btn disabled:text-white disabled:bg-secondary bg-secondary hover:bg-blue-800 text-white text-xl flex items-center justify-center gap-2 py-2"
                disabled={isLoading || isValidating} // Disable button while loading
            >
                {isLoading || isValidating ? ( // Show loading spinner if data is loading
                    <div>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <>
                        {likeData && likeData.isFound ? (
                            <>
                                <AiFillLike size={24} />
                            </>
                        ) : (
                            <>
                                <AiOutlineLike size={24} />
                            </>
                        )}
                    </>
                )}
            </button>

        </>
    );
}



export default Likesbtn;
