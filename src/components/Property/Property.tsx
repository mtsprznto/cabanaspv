import { formatPrice } from "@/utils/formatPrice";
import { PropertyProps } from "./Property.types";
import {
  LiaBathSolid,
  LiaBedSolid,
  LiaRulerCombinedSolid,
  LiaStarSolid,
} from "react-icons/lia";
import { TfiLocationPin } from "react-icons/tfi";
import Image from "next/image";
import { Form } from "../Form";
import { ResenasComponents } from "../ReseñasComponents";
import { ImageSlider } from "./ImageSlider";

export function Property(props: PropertyProps) {
  const { house } = props;

  return (
    <main className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[70%,1fr] grid-cols-1 my-3 py-5">
        <div className="px-6">
          <h1 className="text-3xl mb-4 text-secondary flex justify-between">
            <span>{house.title}</span>
            <span className="font-semibold">{formatPrice(house.price)}</span>
          </h1>
          <div className="flex gap-5 my-4">
            <h2 className="flex gap-3 text-xl items-center">
              <TfiLocationPin></TfiLocationPin>
              {house.location}
            </h2>
            <div className="flex items-center px-2 py-1 rounded-lg bg-secondary top-2 right-2 text-white">
              <LiaStarSolid></LiaStarSolid>
              <span className="ml-1 font-semibold">{house.star}</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <ImageSlider
              images={house.galleryImages.map((img) => img.urlImage)}
              altPrefix={`Casa en ${house.location}`}
            />
          </div>

          <div className="gap-4 lg:flex mt-4">
            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300">
              <LiaBedSolid></LiaBedSolid>
              <span className="ml-2">{house.bedrooms}</span>
            </div>
            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300">
              <LiaBathSolid></LiaBathSolid>
              <span className="ml-2">{house.bathroom}</span>
            </div>
            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300">
              <LiaRulerCombinedSolid></LiaRulerCombinedSolid>
              <span className="ml-2">{house.meters}</span>
            </div>
          </div>
          {/* descripcion */}
          <div className="rounded-lg shadow-light mt-3">
            <div className="p-3 w-full">Descripción</div>
            <div className="whitespace-pre-line border-t p-3">
              {house.description}
            </div>
          </div>
          {/* Reseñas */}
          <ResenasComponents house={house} />
        </div>
        <Form></Form>
      </div>
    </main>
  );
}
