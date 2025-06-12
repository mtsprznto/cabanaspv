import {
  LiaYoutube,
  LiaInstagram,
  LiaLinkedinIn,
  LiaPinterestP,
} from "react-icons/lia";
import { dataFooter } from "./Footer.data";
import Link from "next/link";

export function Footer() {
  return (
    <div className="px-4 py-8 bg-black/90 md:py-40 lg:px-36">
      <div className="grid gap-8 grid-cols-2 md:grid-cols-[1fr,1fr,1fr,_400px] text-white">
        {dataFooter.map(({ id, links }) => (
          <div key={id}>
            {links.map(({ id, name, link }) => (
              <Link key={id} href={link} className="block mb-5">
                {name}
              </Link>
            ))}
          </div>
        ))}
        <div className="md:text-right md:px-5">
          <h4 className="mb-6 text-xl font-semibold">ArriendoPV</h4>
          <p className="">Calle Inventada, 5</p>
          <p className="">Puerto Varas, Chile</p>
          <div className="flex gap-4 mt-5 md:justify-end">
            <LiaInstagram
              className="text-3xl cursor-pointer"
              href="#"
            ></LiaInstagram>
            <LiaLinkedinIn
              className="text-3xl cursor-pointer"
              href="#"
            ></LiaLinkedinIn>
            <LiaPinterestP
              className="text-3xl cursor-pointer"
              href="#"
            ></LiaPinterestP>
            <LiaYoutube
              className="text-3xl cursor-pointer"
              href="#"
            ></LiaYoutube>
          </div>
        </div>
      </div>
    </div>
  );
}
