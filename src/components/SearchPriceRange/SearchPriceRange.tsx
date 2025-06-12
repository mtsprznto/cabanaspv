import { useState } from "react";
import { GrFormDown, GrTag, GrFormUp } from "react-icons/gr";

export function SearchPriceRange() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative mb-2 md:mb-0 flex items-center gap-4 border-[1px] rounded-lg px-3 py-2 justify-between cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <GrTag></GrTag>
      <div>
        <p className="text-sm sm:text-sm md:text-base">Rango de precio</p>
        <p className="text-xs sm:text-sm">Selecciona tu rango de precio</p>
      </div>
      {isOpen ? <GrFormUp></GrFormUp> : <GrFormDown></GrFormDown>}

      {isOpen && (
        <div className="absolute top-[53px] md:top-[62px] md:w-[280px] bg-white z-50 p-4 rounded-lg shadow-light w-[255px] left-0">
          <p>Cualquier rango</p>
          <p>20.000 - 30.000</p>
          <p>30.000 - 40.000</p>
          <p>50.000 - 60.000</p>
        </div>
      )}
    </div>
  );
}
