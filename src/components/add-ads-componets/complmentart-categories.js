import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFilter from "../../hooks/use-filter";

const Buttoncomplmentart = ({ id, ctegoryName }) => {
  const [ComplmentartCategoriesFilter, setComplmentartCategoriesFilter] =
    useFilter("complmentartCategories", "");

  return (
    <div key={id} className="">
      <button
        onClick={() => setComplmentartCategoriesFilter(id)}
        className={`
            ${
              ComplmentartCategoriesFilter === id
                ? "bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple "
                : "bg-white"
            } 
        }  rounded-xl w-full flex justify-around `}
      >
        <div className="text-start">
          <p
            className={` text-2xl  py-6  ${
              ComplmentartCategoriesFilter === id
                ? "text-white"
                : "text-primary-black-dark"
            }`}
          >
            {ctegoryName}
          </p>
        </div>
        <div>
          <FaLongArrowAltRight
            className={`
          ${
            ComplmentartCategoriesFilter === id
              ? "text-white mt-6"
              : "text-primary-cyan mt-6"
          } 
          } mt-7" `}
            size={25}
          />
        </div>
      </button>
    </div>
  );
};

export default Buttoncomplmentart;
