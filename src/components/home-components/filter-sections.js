import React from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

const FilterSections = () => {
  return (
    <div>
      <div className="bg-black mt-4 flex justify-between flex-wrap px-8 md:h-32 h-36">
        <div className="my-auto">
          <p className="text-white md:text-4xl text-2xl md:pl-24 pl-2">
            Fresh recommendations
          </p>
        </div>
        <div className="my-auto flex gap-x-3 overflow-y-auto scrollbar-hide">
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            all
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            text test test
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light md:text-lg text-sm">
            text
          </button>
          <div className="flex gap-2 mx-5">
            <IoMdArrowDropleftCircle
              size={40}
              className="text-white cursor-pointer"
            />
            <IoMdArrowDroprightCircle
              size={40}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSections;
