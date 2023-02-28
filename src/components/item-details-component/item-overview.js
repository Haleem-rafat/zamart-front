import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";

const ItemOverview = ({ data }) => {
  const [lang, setLang] = useLanguage("");
  const [categoriesFromData, setCategoriesFromData] = useState("");

  const objectLop = Object.keys(data?.data || {} || undefined);

  const { run: runCategoriesFromData, isLoading: isLoadingCategoriesFromData } =
    useAxios([]);
  useEffect(() => {
    runCategoriesFromData(
      axios
        .get(api.app.ViewCategoriesFromData("63f299c76b80690068d00423"))
        .then((res) => {
          setCategoriesFromData(res?.data?.data);
        })
    );
  }, [runCategoriesFromData]);
  return (
    <div className="sm:px-36 px-4 text-white">
      <h1 className="text-white text-6xl pt-20 pb-14">ITEM OVERVIEW</h1>
      <div className="sm:flex grid grid-cols-1 justify-between  gap-x-20">
        <div className="w-full">
          <div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">TITLE</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.title}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">PRICE</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.price}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">BRAND</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.brand}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">YEAR</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.year}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">USAGE</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto border-b-[1px] border-primary-gray w-full ">
                {data?.data?.usage}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">city</p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {lang === "en"
                  ? data?.data?.city?.nameEn
                  : data?.data?.city?.nameAr}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                description
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            {categoriesFromData?.formDataFields?.map((e) =>
              objectLop?.map((key) => (
                <>
                  {key === e?.key && (
                    <div className="flex my-8">
                      <p className="text-white font-medium text-2xl w-52">
                        {e?.labelEn}
                      </p>
                      <p className="text-primary-gray text-lg sm:mx-10 mx-auto border-b-[1px] border-primary-gray w-full ">
                        {data?.data?.[key]}
                      </p>
                    </div>
                  )}
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOverview;
