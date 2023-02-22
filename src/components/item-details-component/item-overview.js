import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api";
import useAxios from "../../hooks/use-axios";

const ItemOverview = ({ data }) => {
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
    <div className="px-36 text-white">
      <h1 className="text-white text-6xl pt-20 pb-14">ITEM OVERVIEW</h1>
      <div className="flex justify-between gap-x-20">
        <div className="w-full">
          <div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">TITLE</p>
              <p className="text-primary-gray text-lg mx-10   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.title}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">PRICE</p>
              <p className="text-primary-gray text-lg mx-10   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.price}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">BRAND</p>
              <p className="text-primary-gray text-lg mx-10   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.brand}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">YEAR</p>
              <p className="text-primary-gray text-lg mx-10   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.year}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">USAGE</p>
              <p className="text-primary-gray text-lg mx-10   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.usage}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">CITIE</p>
              <p className="text-primary-gray text-lg mx-10  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.title}
                {console.log(data?.data)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className=" w-full">
            {categoriesFromData?.formDataFields?.map((e) =>
              objectLop?.map((key) => (
                <>
                  {key === e?.key && (
                    <div className="flex my-8">
                      <p className="text-white font-medium text-2xl w-52">
                        {e?.labelEn}
                      </p>
                      <p className="text-primary-gray text-lg mx-10 border-b-[1px] border-primary-gray w-full ">
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
