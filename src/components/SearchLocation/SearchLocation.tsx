import { useState } from "react";
import { GrFormDown, GrLocation, GrFormUp } from "react-icons/gr";

export function SearchLocation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative mb-2 md:mb-0 flex items-center gap-4 border-[1px] rounded-lg px-3 py-2 justify-between cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <GrLocation></GrLocation>
      <div>
        <p className="text-sm sm:text-sm md:text-base">Localizacion</p>
        <p className="text-xs sm:text-sm">Selecciona tu localizacion</p>
      </div>
      {isOpen ? <GrFormUp></GrFormUp> : <GrFormDown></GrFormDown>}

      {isOpen && (
        <div className="absolute top-[70px] bg-white z-50 p-4 rounded-lg shadow-light w-[230px] left-0">
          <p>Puerto Varas</p>
          <p>Puerto Montt</p>
          <p>Llanquihue</p>
        </div>
      )}
    </div>
  );
}
