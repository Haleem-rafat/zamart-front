import React from "react";
import { useHistory } from "react-router-dom";
import useFilter from "../../hooks/use-filter";
import routes from "../../routes";

const CategoriesCard = ({ img, lable, info, id }) => {
  const history = useHistory();
  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");
  return (
    <div
      onClick={() => {
        setCategoriesFiter(id);
        history.push(`${routes.app.searchPage}?category=${id}`);
      }}
      className="w-full relative "
    >
      <div>
        <div className=" w-full h-[320px] bg-gradient-to-t from-primary-black absolute z-10 cursor-pointer">
          <p className="border-t-4 border-primary-cyan w-16 mt-48 mx-5 "></p>
          <p className="sm:text-4xl text-2xl  text-white mx-5 pt-3 pb-2">
            {lable}
          </p>
          <p className="text-slate-400 sm:text-xl px-4 text-lg">{info}</p>
        </div>
        <div className=" w-full h-[320px]">
          <img
            className=" object-cover w-full h-full relative"
            src={`data:image/jpeg;base64,${img}`}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
