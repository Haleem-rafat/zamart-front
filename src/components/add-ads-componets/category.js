import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFilter from "../../hooks/use-filter";

const ButtonCategory = ({ category, ctegoryName, id }) => {
  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");

  return (
    <div key={id} className="">
      <button
        onClick={() => setCategoriesFiter(id)}
        className={`
            ${
              categoriesFilter === id
                ? "bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple "
                : "bg-white"
            }
          
        }  rounded-xl w-full flex justify-around `}
      >
        <div className="text-start">
          <p className="pt-5 text-primary-gray-light text-xl">{category}</p>
          <p
            className={` text-2xl pt-2 pb-8  ${
              categoriesFilter === id ? "text-white" : "text-primary-black-dark"
            }`}
          >
            {ctegoryName}
          </p>
        </div>
        <div>
          <FaLongArrowAltRight
            className={` " mt-5 rtl:rotate-180 "} 
          ${categoriesFilter === id ? "text-white" : "text-primary-cyan "} `}
            size={25}
          />
        </div>
      </button>
    </div>
  );
};

export default ButtonCategory;
