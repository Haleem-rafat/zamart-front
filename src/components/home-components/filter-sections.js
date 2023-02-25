import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import api from "../../api";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";
import useFilter from "../../hooks/use-filter";

const FilterSections = () => {
  const [lang] = useLanguage("");

  const [categories, setCategories] = useState();
  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");
  const [subCategoriesFilter, setSubCategoriesFilter] = useFilter(
    "subCategory",
    ""
  );

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(api.app.viewSubCategories(categoriesFilter)).then((res) => {
        setCategories(res?.data?.data);
      })
    );
  }, [categoriesFilter, run]);

  return (
    <div>
      <div className="bg-black mt-4 flex justify-between flex-wrap px-8 md:h-32 h-36">
        <div className="my-auto">
          <p className="text-white md:text-4xl text-2xl md:pl-24 pl-2">
            Fresh recommendations
          </p>
        </div>
        <div className="my-auto flex gap-x-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => {
              setCategoriesFiter("");
              setSubCategoriesFilter("");
            }}
            className="h-11 px-8 border-[1px] rounded-full text-white  focus:bg-primary-cyan-light md:text-lg text-sm"
          >
            ALL
          </button>
          {categories?.map((e) => (
            <button
              onClick={() => setSubCategoriesFilter(e?._id)}
              className={
                subCategoriesFilter === e?._id
                  ? "bg-primary-cyan-light h-11 px-8 border-[1px] rounded-full text-white  md:text-lg text-sm uppercase"
                  : "h-11 px-8 border-[1px] rounded-full text-white  md:text-lg text-sm uppercase"
              }
            >
              {lang === "en" ? e?.nameEn : e?.nameAr}
            </button>
          ))}
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
