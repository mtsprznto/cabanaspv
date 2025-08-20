"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageSliderProps {
  images: string[];
  altPrefix?: string;
}

export function ImageSlider({
  images,
  altPrefix = "Imagen de propiedad",
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
      <Image
        src={`/assets/houses/${images[current]}`}
        alt={`${altPrefix} ${current + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        priority
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md"
      >
        <FiChevronRight size={24} />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === current ? "bg-secondary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
