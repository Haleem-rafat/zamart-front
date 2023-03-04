import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFilter from "../../hooks/use-filter";

const ButtonSubCategory = ({ id, ctegoryName, setIScomplment }) => {
  const [subCategoriesFilter, setSubCategoriesFilter] = useFilter(
    "subCategory",
    ""
  );

  return (
    <div key={id} className="">
      <button
        onClick={() => setSubCategoriesFilter(id)}
        className={`
            ${
              subCategoriesFilter === id
                ? "bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple "
                : "bg-white"
            } 
        }  rounded-xl w-full flex justify-around `}
      >
        <div className="text-start">
          <p
            className={` text-2xl  py-6  ${
              subCategoriesFilter === id
                ? "text-white"
                : "text-primary-black-dark"
            }`}
          >
            {ctegoryName}
          </p>
        </div>
        <div>
          <FaLongArrowAltRight
            className={`${
              subCategoriesFilter === id
                ? "text-white mt-6 rtl:rotate-180"
                : "text-primary-cyan mt-6 rtl:rotate-180"
            }`}
            size={25}
          />
        </div>
      </button>
    </div>
  );
};

export default ButtonSubCategory;
