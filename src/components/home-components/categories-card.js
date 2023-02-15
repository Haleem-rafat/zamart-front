import React from "react";

const CategoriesCard = ({ img, lable, info }) => {
  return (
    <div className="w-full relative ">
      <div className=" w-full h-[300px] hover:bg-gradient-to-t hover:from-primary-black absolute z-10 cursor-pointer">
        <p className="border-t-4 border-primary-cyan w-16 mt-36 text-4xl text-white m-5 pt-3">
          {lable}
        </p>
        <p className="text-slate-400 text-xl px-4 ">{info}</p>
      </div>
      <div className=" w-full h-[300px]">
        <img
          className=" object-cover w-full h-full relative"
          src={img}
          alt="img"
        />
      </div>
    </div>
  );
};

export default CategoriesCard;
