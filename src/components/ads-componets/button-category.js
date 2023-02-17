import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFilter from "../../hooks/use-filter";

const ButtonCategory = ({ category, ctegoryName, isBig, id }) => {
  const [categoriesFilter, setCategoriesFiter] = useFilter("categories", "");
  const [subCategoriesFilter, setSubCategoriesFilter] = useFilter(
    "subCategories",
    ""
  );

  return (
    <div key={id} className="">
      <button
        onClick={
          isBig
            ? () => setCategoriesFiter(id)
            : () => setSubCategoriesFilter(id)
        }
        className={`${
          isBig
            ? categoriesFilter === id
              ? "bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple "
              : "bg-white"
            : subCategoriesFilter === id
            ? "bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple "
            : "bg-white"
        }  rounded-xl w-full flex justify-around `}
      >
        <div className="text-start">
          <p
            className={`${
              isBig ? "pt-11" : "pt-5"
            } text-primary-gray-light text-xl `}
          >
            {category}
          </p>
          <p
            className={` text-2xl pt-2 pb-8  ${
              isBig
                ? categoriesFilter === id
                  ? "text-white"
                  : "text-primary-black-dark"
                : subCategoriesFilter === id
                ? "text-white"
                : "text-primary-black-dark"
            }
              `}
          >
            {ctegoryName}
          </p>
        </div>
        <div>
          <FaLongArrowAltRight
            className={`${isBig ? "mt-5" : "mt-7"} 
          ${categoriesFilter === id ? "text-white" : "text-primary-cyan"}
          ${subCategoriesFilter === id ? "text-white" : "text-primary-cyan"} `}
            size={25}
          />
        </div>
      </button>
    </div>
  );
};

export default ButtonCategory;
