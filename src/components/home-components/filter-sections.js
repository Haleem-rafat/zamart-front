import React from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

const FilterSections = () => {
  return (
    <div>
      <div className="bg-black mt-4 flex justify-between px-8 h-28">
        <div className="my-auto">
          <p className="text-white text-4xl pl-24">Fresh recommendations</p>
        </div>
        <div className="my-auto flex gap-x-3">
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
            all
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
            test filter
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
            text test test
          </button>
          <button className="h-11 px-8 border-[1px] rounded-full text-white hover:bg-primary-cyan-light text-lg">
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
