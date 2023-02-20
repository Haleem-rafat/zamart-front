import React from "react";
import useFilter from "../../hooks/use-filter";

const CategoriesCard = ({ img, lable, info, id }) => {
  const [categoriesFilter, setCategoriesFiter] = useFilter("categories", "");
  return (
    <div onClick={() => setCategoriesFiter(id)} className="w-full relative ">
      <a href="#Categories">
        <div className=" w-full h-[300px] bg-gradient-to-t from-primary-black absolute z-10 cursor-pointer">
          <p className="border-t-4 border-primary-cyan w-16 mt-36 text-4xl text-white m-5 pt-3">
            {lable}
          </p>
          <p className="text-slate-400 text-xl px-4 ">{info}</p>
        </div>
        <div className=" w-full h-[300px]">
          <img
            className=" object-cover w-full h-full relative"
            src={`data:image/jpeg;base64,${img}`}
            alt="img"
          />
        </div>
      </a>
    </div>
  );
};

export default CategoriesCard;
