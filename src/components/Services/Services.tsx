"use client";

import { Transition } from "../Transition";
import { Slider } from "./Slider";

export function Services() {
  return (
    <Transition className="flex flex-col md:grid md:grid-cols-2 px-4 py-8 md:py-46 md:px-36 md:gap-28">
      <div className="max-w-xl mb-7">
        <h4 className="text-secondary">Bienvenidos a Puerto Varas 🌄 </h4>
        <h2 className="my-4 text-3xl font-semibold">
          Te invitamos a disfrutar una estadía inolvidable en una casa pensada
          para tu descanso.
        </h2>
        <p className="mb-10 mt-7">
          Esta acogedora vivienda cuenta con:
          <ul>
            <li>🛏️ Habitación principal con cama matrimonial</li>
            <li>🛌 Dormitorio adicional con dos camas individuales </li>
            <li>🛏️ Habitación principal con cama matrimonial</li>
            <li>🛌 Dormitorio adicional con dos camas individuales</li>
            <li>🍽️ Comedor full equipado y funcional</li>
            <li>🍳 Cocina equipada</li>
            <li>🚿 Baño privado</li>
          </ul>
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Slider></Slider>
      </div>
    </Transition>
  );
}
