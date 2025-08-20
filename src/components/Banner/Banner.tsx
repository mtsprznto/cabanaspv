
export function Banner() {
  return (
    <div className="container relative mx-auto">
      <div className="pt-10 md:pt-0 min-h-[80vh] bg-banner bg-no-repeat bg-cover bg-center  relative flex flex-col items-center md:justify-center">
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="max-w-4xl sm:max-w-1xl md:max-w-3xl text-center text-white  relative z-10  items-center justify-center h-full ">
          <h2 className="text-sm sm:text-3xl md:text-5xl font-semibold">
            Arriendo Puerto varas
          </h2>
          <p className="text-xs mt-2 sm:text-xl md:text-xl md:mt-8">
            Alojarse en un lugar maravilloso como lo es Nuestra ciudad y sentirse como un Puerto Varino más.
          </p>
        </div>
        {/* <FloatedSearch></FloatedSearch> */}
      </div>
    </div>
  );
}
