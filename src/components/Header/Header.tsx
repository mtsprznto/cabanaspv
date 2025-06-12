"use client";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { Navbar } from "../Navbar";
import { useState } from "react";

export function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-between px-5 md:px-0">
        <Link href={"/"}>
          <h1 className="font-medium">ArriendosPV</h1>
        </Link>
        <CiMenuFries
          className="block text-2xl md:hidden cursor-pointer"
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
        ></CiMenuFries>
        <Navbar openMobileMenu={openMobileMenu}></Navbar>
        
        <div className="flex items-center gap-2 md:gap-5">
          <Link
            href={"tel:99999999"}
            className="flex items-center gap-4 cursor-pointer"
          >
            <BsTelephone></BsTelephone>
            <span className="hidden md:block">+569 99999999</span>
          </Link>
          {/* <Link href={"/login"} className="px-3 py-2 text-white rounded-lg bg-secondary hover:bg-black">Login</Link> */}
        </div>
      </div>
    </div>
  );
}
