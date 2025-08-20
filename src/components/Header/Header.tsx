"use client";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { useState } from "react";
import { Navbar } from "..";
import { FaWhatsapp } from "react-icons/fa";

export function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-between px-5 md:px-0">
        <Link href={"/"}>
          <h1 className="font-medium text-[1.2rem] md:text-[1.4rem]">Dept</h1>
        </Link>
        <CiMenuFries
          className="block text-2xl md:hidden cursor-pointer"
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
        ></CiMenuFries>
        <Navbar openMobileMenu={openMobileMenu}></Navbar>

        <div className="flex items-center gap-2 md:gap-5">
          <a
            href="https://wa.me/56999479312?text=Hola!%20Estoy%20interesado%20en%20los%20arriendos%20de%20Puerto%20Varas.%20¿Me%20puedes%20contar%20más?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 cursor-pointer text-green-600 hover:text-green-800"
          >
            <div className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2">
              <FaWhatsapp size={18} />
              <span className="hidden md:block">Contáctanos</span>
            </div>
          </a>

          {/* <Link href={"/login"} className="px-3 py-2 text-white rounded-lg bg-secondary hover:bg-black">Login</Link> */}
        </div>
      </div>
    </div>
  );
}
