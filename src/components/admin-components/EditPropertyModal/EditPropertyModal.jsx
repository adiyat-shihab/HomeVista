import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import React, { useContext, useEffect, useState } from "react";
import { Checkbox, Input, message, Select, Spin, Steps } from "antd";
import divisions from "@/lib/add-property-divisions";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import axios from "axios";
import districtsData from "@/lib/add-property-districts";
import { authContext } from "@/context/authContext/AuthProvider";
import { useRouter } from "next/navigation";
import "@/app/(ui)/add-property/steps.css";
import TextArea from "antd/es/input/TextArea";
import { BiTrash } from 'react-icons/bi';
import "./propertyModelStyle.css";

const EditPropertyModal = ({ data: propertyData, setIsOpen, modalIsOpen, refetch }) => {

    function closeModal() {
        setIsOpen(false);
    }



    const [current, setCurrent] = useState(0);
    const [rentCheckbox, setrentCheckbox] = useState();
    const [saleCheckbox, setsaleCheckbox] = useState();
    const [division, setDivision] = useState();
    const [district, setDistrict] = useState();
    const [place, setPlace] = useState([]);
    const [area, setArea] = useState();
    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [street, setStreet] = useState();
    const [price, setPrice] = useState();
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [size, setSize] = useState();

    // reseting state
    useEffect(() => {
        if (modalIsOpen) {
            setrentCheckbox(propertyData?.rentCheckbox);
            setsaleCheckbox(propertyData?.saleCheckbox);
            setDivision(propertyData?.division);
            setDistrict(propertyData?.district);
            setPlace(propertyData?.place);
            setArea(propertyData?.area);
            setImage(propertyData?.image);
            setTitle(propertyData?.title);
            setDescription(propertyData?.description);
            setStreet(propertyData?.street);
            setPrice(propertyData?.price);
            setSize(propertyData?.size);
            setCurrent(0);
        }
    }, [modalIsOpen, propertyData]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleImageRemove = (img) => {
        setImage(() => {
            return image.filter((currImage) => currImage !== img);
        });
        message.success("Image removed successfully");
    }

    const customRequest = async ({ file, onSuccess, onError }) => {
        const image = { image: file };

        const response = await axios.post(
            "https://api.imgbb.com/1/upload?key=0ebb240c8ce479a4159793d2a4acc3f4",
            image,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );

        if (response.data.success) {
            setImage((prevState) => [...prevState, response.data.data.url]);
            message.success("Image uploaded successfully");
            onSuccess();
        } else {
            message.error("Error uploading image");
            onError();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!size || !price || image.length === 0) {
            message.error("Please fill out all required fields.");
            return;
        }

        setSubmitLoading(true);


        const data = {
            rentCheckbox,
            saleCheckbox,
            division,
            district,
            area,
            image,
            title,
            description,
            street,
            price,
            size,
        };
        await fetch(`/api/properties/${propertyData._id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
            .then((res) => console.log(res))
            .then(() => {
                setSubmitLoading(false);
                message.success("Successfully updated");
                refetch();
                closeModal();
            });
    };

    const steps = [
        {
            title: "Property Title",
            content: (
                <>
                    <div>
                        <div className="pb-2 pt-4">
                            <h4
                                className={
                                    "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                }
                            >
                                Title
                            </h4>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="pb-2 pt-4">
                            <h4
                                className={
                                    "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                }
                            >
                                Description
                            </h4>

                            <TextArea
                                name="description"
                                rows={6}
                                id="description"
                                className="text-xl block focus:shadow-md transition border border-[#CACACA]   w-full outline-none p-4 rounded-[0.125rem]"
                                style={{ fontSize: '1.25rem' }}
                                required
                                defaultValue={description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="pb-2 pt-4 flex items-center justify-between">
                            <Checkbox
                                checked={rentCheckbox}
                                onChange={(e) => {
                                    setsaleCheckbox(false);
                                    setrentCheckbox(e.target.checked);
                                }}
                            >
                                <span className={" text-[0.875rem] font-normal text-[#4F4F4F]"}>
                                    Rent
                                </span>
                            </Checkbox>
                            <Checkbox
                                className="checked:text-red-600 checked:bg-black"
                                checked={saleCheckbox}
                                onChange={(e) => {
                                    setrentCheckbox(false);
                                    setsaleCheckbox(e.target.checked);
                                }}
                            >
                                <p className={" text-[0.875rem] font-normal text-[#4F4F4F]"}>
                                    Sell
                                </p>
                            </Checkbox>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: "Property Address",
            content: (
                <>
                    <div>
                        <div className="pb-2 pt-4">
                            <h4
                                className={
                                    "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                }
                            >
                                Street
                            </h4>
                            <Input
                                type="text"
                                id="street"
                                name="street"
                                value={street}
                                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                                required
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>
                        <div className="pb-2 pt-4 flex items-center justify-between">
                            <div>
                                <h4
                                    className={
                                        "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                    }
                                >
                                    Division
                                </h4>

                                <Select
                                    defaultValue={division}
                                    style={{ width: 120 }}
                                    options={divisions}
                                    onChange={(value) => {
                                        setDistrict("");
                                        setArea("");
                                        setDivision(value);
                                    }}
                                />
                            </div>
                            <div>
                                <h4
                                    className={
                                        "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                    }
                                >
                                    District
                                </h4>

                                <Select
                                    style={{ width: 120 }}
                                    options={districtsData[division]}
                                    value={district}
                                    onChange={async (value) => {
                                        setLoading(true);
                                        setArea("");
                                        setPlace([]);
                                        setDistrict(value);
                                        const where = encodeURIComponent(
                                            JSON.stringify({
                                                adminName2: value,
                                            })
                                        );
                                        const data = await fetch(
                                            `https://parseapi.back4app.com/classes/BD?where=${where}`,
                                            {
                                                headers: {
                                                    "X-Parse-Application-Id":
                                                        "zS2XAEVEZAkD081UmEECFq22mAjIvX2IlTYaQfai",
                                                    "X-Parse-Master-Key":
                                                        "t6EjVCUOwutr1ruorlXNsH3Rz65g0jiVtbILtAYU",
                                                },
                                            }
                                        ).then((res) => {
                                            setLoading(false);
                                            return res.json();
                                        });

                                        const updatedPlace = [];
                                        data.results.map((item) => {
                                            const exist = updatedPlace.find(
                                                (data) => data.value === item.adminName3
                                            );
                                            if (!exist) {
                                                updatedPlace.push({
                                                    value: item.adminName3,
                                                    label: item.adminName3,
                                                });
                                            }
                                        });
                                        setPlace(updatedPlace);
                                    }}
                                />
                            </div>
                            <div>
                                <h4
                                    className={
                                        "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                    }
                                >
                                    Area
                                </h4>

                                <div>
                                    <Select
                                        style={{ width: 120 }}
                                        loading={loading}
                                        options={place}
                                        value={area}
                                        onChange={(value) => setArea(value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: "Publish",
            content: (
                <>
                    <div className='overflow-scroll h-[60vh]'>
                        <div className="pb-2 pt-4 mb-4">
                            <h4
                                className={
                                    "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                }
                            >
                                Size
                            </h4>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                min="100"
                                defaultValue={size}
                                value={size}
                                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                                required
                                onChange={(e) => {
                                    const number = parseInt(e.target.value);
                                    setSize(number);
                                }}
                            />
                        </div>
                        <div className="pb-2 pt-4 mb-4">
                            <h4
                                className={
                                    "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                                }
                            >
                                {rentCheckbox ? "Rent per day" : "Price"}
                            </h4>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                defaultValue={price}
                                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                                required
                                onChange={(e) => {
                                    const number = parseInt(e.target.value);
                                    setPrice(number);
                                }}
                            />
                        </div>
                        <div className=''>
                            <div>
                                <Dragger
                                    customRequest={customRequest}
                                    onChange={onChange}
                                    listType="picture"
                                    fileList={fileList}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <Image
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO3WSwrCMBAG4NwuV/MInmRAewCxeATbrCwuXbir6YiKNWD6SDN5UOaHHwKl5WOS0grBIYrcHDBmxRJgrEgG5jBBdetIa2bRmYwNVMa1aMDrvcOHRmw1vtfZAVv9u/+1XhVQTp1Jqi1uF24xnLu+wYDK4yUhAZaNxuMlU2DZ6P4BNmRRa9xViYAmzoYsao3b06dDyGBAG85EFgZuDBkEOIb7dl/9A21IcuAcHDggyYFzcTATmRwIE8gsgDCCzAYIA0hyYMhIBnpG8gQ9I1c7QRmxyhVoA1P/VauBMlClmmDMgivQBvb5PoNDGQipJhizgiNo8gTt26xvrs1I2gAAAABJRU5ErkJggg=="
                                            alt={"upload image"}
                                            width={50}
                                            height={50}
                                            className={"mx-auto"}
                                        />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibited from
                                        uploading company data or other banned files.
                                    </p>
                                </Dragger>
                            </div>
                            <div>
                                {
                                    image.map((img, index) => <div className='flex px-2 items-center justify-between border-2 border-rounded my-1' key={index}>

                                        <div className='w-12 h-12 relative'>
                                            <Image src={img} alt={`Image ${index + 1}`} objectFit='cover' fill />
                                        </div>
                                        <span>{img}</span>
                                        <button
                                            onClick={() => handleImageRemove(img)}
                                            className='text-red-600'>
                                            <BiTrash />
                                        </button>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ];
    const next = () => {
        if (current == 0) {
            console.log(current);
            if (!title || !description) {
                message.error("Please fill out all required fields.");
                return;
            }
        } else if (current == 1) {
            if (!street || !division || !district || !area) {
                message.error("Please fill out all required fields.");
                return;
            }
        }
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));


    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="w-2/3 min-h-[80vh] absolute top-1/2 left-1/2   -translate-y-1/2 -translate-x-1/2 bg-white drop-shadow-lg"
            >
                <div className='flex justify-end m-4'>
                    <button onClick={closeModal} className='text-lg p-1 rounded-full bg-red-600 text-white '>
                        <CgClose />
                    </button>
                </div>

                {
                    submitLoading ?
                        <div className='h-[80vh] w-full flex items-center justify-center'>
                            <span className="loading loading-bars"></span>
                        </div>
                        :
                        <div>
                            <Steps
                                type="navigation"
                                current={current}
                                className="site-navigation-steps"
                                items={items}
                                style={{ marginTop: "1rem" }}
                            />
                            <div className={"py-2"}>
                                <div className={"pb-2 w-2/3 mx-auto"}>
                                    {steps[current].content}{" "}
                                    {current > 0 && (
                                        <button
                                            className={
                                                "px-6 py-2 rounded mt-4  bg-[#3A0CA3] text-white text-[0.875rem] font-normal  "
                                            }
                                            onClick={() => prev()}
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {current < steps.length - 1 && (
                                        <button
                                            className={
                                                "px-6 py-2 ml-2 rounded mt-4  bg-[#3A0CA3] text-white text-[0.875rem] font-normal  "
                                            }
                                            onClick={() => {
                                                next();
                                            }}
                                        >
                                            Next
                                        </button>
                                    )}{" "}
                                    {current === steps.length - 1 && (
                                        <button
                                            className={
                                                "px-6 py-2 ml-2 rounded mt-4  bg-[#3A0CA3] text-white text-[0.875rem] font-normal  "
                                            }
                                            onClick={handleSubmit}
                                        >
                                            Publish
                                        </button>
                                    )}{" "}
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: 24,
                                }}
                            ></div>
                        </div>
                }

            </Modal>
        </div>
    )
}

export default EditPropertyModal
