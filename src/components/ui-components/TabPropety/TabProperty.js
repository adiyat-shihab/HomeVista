import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const TabProperty = () => {
    const divisions = [
        { id: 1, name: "Dhaka" },
        { id: 2, name: "Chittagong" },
        { id: 3, name: "Rajshahi" },
        { id: 4, name: "Khulna" },
        { id: 5, name: "Barisal" },
        { id: 6, name: "Sylhet" },
        { id: 7, name: "Rangpur" },
        { id: 8, name: "Mymensingh" },
    ];
    return (
        <>
            <div>TabProperty</div>
            <Tabs className="m-5">
                <TabList className="flex justify-center">
                    {divisions.map((division) => (
                        <Tab key={division.id} >
                            <div className="btn bg-secondary hover:blue-800 text-white">{division.name}</div>
                        </Tab>
                    ))}
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default TabProperty

