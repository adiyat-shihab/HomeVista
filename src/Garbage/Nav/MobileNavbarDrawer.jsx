"use client";
import { useState } from "react";
import { Drawer } from "antd";
import Link from "next/link";

const MobileNavbarDrawer = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const cancelDrawer = () => {
    setOpen(false);
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 hover:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={showDrawer}
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <Drawer
        open={open}
        width={200}
        onClose={cancelDrawer}
        title={"Home Vister"}
      >
        <div onClick={cancelDrawer} className={"flex flex-col gap-y-4"}>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/contact"}>Contact Us</Link>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavbarDrawer;
