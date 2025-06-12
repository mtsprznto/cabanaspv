import { SearchButton } from "../SearchButton";
import { SearchLocation } from "../SearchLocation";
import { SearchPriceRange } from "../SearchPriceRange";
import { SearchProperty } from "../SearchProperty";
import { Transition } from "../Transition";

export function FloatedSearch() {
  return (
    <Transition className="absolute bottom-10 md:-bottom-10 left-0 right-0 w-[75%] mx-auto md:w-[100%] lg:w-[55%]">
      <div className="flex-col justify-between gap-2 px-4 py-4 bg-white rounded-md md:flex md:flex-row backdrop-blur shadow-light sm:gap-2 sm:px-3 sm:py-3">
        <SearchLocation></SearchLocation>
        <SearchProperty></SearchProperty>
        <SearchPriceRange></SearchPriceRange>
        <SearchButton></SearchButton>
      </div>
    </Transition>
  );
}
