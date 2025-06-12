import { RiSearch2Line } from "react-icons/ri";
export function SearchButton() {
  return (
    <div className="gap-4 border-[1px] rounded-lg px-14 sm:px-6 py-2 bg-secondary flex items-center text-white justify-center cursor-pointer">
      <RiSearch2Line></RiSearch2Line>
    </div>
  );
}
