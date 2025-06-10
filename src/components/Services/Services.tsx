"use client";

import { Transition } from "../Transition";
import { Slider } from "./Slider";

export function Services() {
  return (
    <Transition className="flex flex-col md:grid md:grid-cols-2 px-4 py-8 md:py-46 md:px-36 md:gap-28">
      <div className="max-w-xl mb-7">
        <h4 className="text-secondary">Servicios</h4>
        <h2 className="my-4 text-3xl font-semibold">
          Promociona tu vivienda para alquilarla al mejor precio
        </h2>
        <p className="mb-10 mt-7">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
          dolorum nihil aperiam voluptatem ipsam est modi id reiciendis nam
          accusantium, libero voluptatum perferendis quis nulla odio eaque esse
          cum ad!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Slider></Slider>
      </div>
    </Transition>
  );
}
