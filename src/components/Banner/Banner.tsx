import { FloatedSearch } from "../FloatedSearch";

export function Banner() {
  return (
    <div className="container relative mx-auto">
      <div className="pt-10 md:pt-0 min-h-[80vh] bg-banner bg-no-repeat bg-cover bg-center  relative flex flex-col items-center md:justify-center">
        <div className="max-w-4xl sm:max-w-1xl md:max-w-3xl text-center text-white">
          <h2 className="text-sm sm:text-3xl md:text-5xl font-semibold">
            Descubre el departamento ideal para tu familia
          </h2>
          <p className="text-xs mt-2 sm:text-xl md:text-xl md:mt-8">
            Descripcion inicial // Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequatur voluptates perferendis, iste dolore mollitia possimus, dicta non eum eaque ipsum accusamus error magni facere. Expedita voluptatum reprehenderit alias ratione!
          </p>
        </div>
        <FloatedSearch></FloatedSearch>
      </div>
    </div>
  );
}
