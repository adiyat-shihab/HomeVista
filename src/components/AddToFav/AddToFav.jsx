"use client";

import { message } from 'antd';
import React, { useEffect } from 'react'
import { LuHeart, LuHeartOff } from "react-icons/lu";
import useSWR, { mutate } from 'swr';

const AddToFav = ({ userId, propertyId, setFavourite }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const url = `/api/add-to-favourite?userId=${userId}&propertyId=${propertyId}`;

    const { data: favData, error } = useSWR(url, getFav);

    useEffect(() => {
        if (favData) {
            setFavourite(() => favData?.favCount);
        }
    }, [favData]);

    const handleFav = () => {
        if (favData && favData.isFound !== undefined) {
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.status === "ok") {
                        messageApi.open({
                            type: "success",
                            content: data.message,
                        });
                        mutate(url);
                    }

                });
        }

    }
    return (
        <>
            <button onClick={handleFav} className=" btn bg-secondary hover:bg-blue-800 text-white text-xl flex items-center justify-center gap-2 py-2">
                {contextHolder}
                {
                    favData?.isFound ? <><LuHeartOff /> Unfavourite </> :
                        <><LuHeart /> Favourite</>
                }
            </button>
        </>
    )
}


const getFav = async (url) => {
    const res = await fetch(url, {
        method: "GET"
    });

    const result = await res.json();

    return result;
}

export default AddToFav;
