import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const ItemOverview = ({ data }) => {
  const [lang, setLang] = useLanguage("");
  const selectedContent = content[lang];

  const [categoriesFromData, setCategoriesFromData] = useState("");

  const objectLop = Object.keys(data?.data || {} || undefined);

  const { run: runCategoriesFromData, isLoading: isLoadingCategoriesFromData } =
    useAxios([]);
  useEffect(() => {
    if (data?.data?.category?._id)
      runCategoriesFromData(
        axios
          .get(api.app.ViewCategoriesFromData(data?.data?.category?._id))
          .then((res) => {
            setCategoriesFromData(res?.data?.data);
          })
      );
  }, [runCategoriesFromData, data?.data?.category?._id]);
  return (
    <div className="sm:px-36 px-4 text-white">
      <h1 className="text-white text-6xl pt-20 pb-14">
        {selectedContent[localizationKeys.ITEMOVERVIEW]}
      </h1>
      <div className="sm:flex grid grid-cols-1 justify-between  gap-x-20">
        <div className="w-full">
          <div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {selectedContent[localizationKeys.title]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.title}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {" "}
                {selectedContent[localizationKeys.price]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto   border-b-[1px] border-primary-gray w-full ">
                {data?.data?.price}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {" "}
                {selectedContent[localizationKeys.brand]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.brand}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {" "}
                {selectedContent[localizationKeys.year]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.year}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {" "}
                {selectedContent[localizationKeys.usage]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto border-b-[1px] border-primary-gray w-full ">
                {data?.data?.usage}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {" "}
                {selectedContent[localizationKeys.city]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {lang === "en"
                  ? data?.data?.city?.nameEn
                  : data?.data?.city?.nameAr}
              </p>
            </div>
            <div className="flex my-8">
              <p className="text-white font-medium text-2xl w-52">
                {selectedContent[localizationKeys.description]}
              </p>
              <p className="text-primary-gray text-lg sm:mx-10 mx-auto  border-b-[1px] border-primary-gray w-full ">
                {data?.data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            {categoriesFromData &&
              categoriesFromData?.map((e) =>
                objectLop?.map((key) => (
                  <>
                    {key === e?.key && (
                      <div className="flex my-8">
                        <p className="text-white font-medium text-2xl w-52">
                          {lang === "en" ? e?.labelEn : e?.labelAr}
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
