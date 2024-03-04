"use client";

import React, { useContext, useState } from 'react';
import { MdCancel } from "react-icons/md";
import Modal from "react-modal";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import SuccessAlert from "@/components/ui-components/SuccessAlert/SuccessAlert";
import { authContext } from '@/context/authContext/AuthProvider';

const ReportProperty = ({ propertyId, author }) => {
    const { currentUser } = useContext(authContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleReport = async (form) => {
        const report = form.get("report");
        const name = form.get("name");
        const email = form.get("email");

        const formData = {
            propertyId,
            report,
            reporterName: name,
            reporterEmail: email,
            reporterId: currentUser?.uid,
            authorName: author,
        };

        fetch("/api/property-report", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                closeModal();
                SuccessAlert(data.message);
            });
    };
    return (
        <li className='hover:bg-gray-200'>

            <button onClick={openModal} className="">
                <span className="text-xl">
                    <MdOutlineReportGmailerrorred />
                </span>
                Report post
            </button>
            {/* Modal is here */}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="border-2 w-2/3 pb-10 bg-white left-1/2 top-1/2 absolute -translate-y-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col  items-end">
                    <button className="m-4 text-3xl text-red-600" onClick={closeModal}>
                        <MdCancel />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold">Submit your report</h2>
                    <form action={handleReport} className="w-full px-10">
                        {/* Name Field Start */}
                        <div className="form-control">
                            <label className="label  ">
                                <span className="label-text  ">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={currentUser?.displayName}
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Name Field End */}
                        {/* Email Field Start */}
                        <div className="form-control">
                            <label className="label  ">
                                <span className="label-text  ">Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                defaultValue={currentUser?.email}
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Email Field End */}
                        {/* Report Field Start */}
                        <div className="form-control">
                            <label className="label  ">
                                <span className="label-text ">Report</span>
                            </label>
                            <textarea
                                type="text"
                                name="report"
                                placeholder="tell us what's wrong in the post"
                                className="input pt-4 h-32 input-bordered"
                                required
                            ></textarea>
                        </div>
                        {/* Report Field End */}

                        <div className="form-control mt-6">
                            <input
                                type="submit"
                                value="Submit Report"
                                className="btn bg-secondary hover:bg-blue-800 border-none text-white"
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </li>
    );
};

export default ReportProperty;