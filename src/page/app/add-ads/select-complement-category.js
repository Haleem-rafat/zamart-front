import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import api from "../../../api";
import Buttoncomplmentart from "../../../components/add-ads-componets/complmentart-categories";
import { BreadCrumbAddAds } from "../../../components/shared/Breadcrumb/bread-crumb-add-ads";
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import { axios } from "../../../config/axios-config";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import { useQuery } from "../../../hooks/use-query";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";
import routes from "../../../routes";

const SelectComplementCategory = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];

  const query = useQuery();
  const history = useHistory();
  const { subCategoryId } = useParams();
  const complmentartCategoriesID = query.get("complmentartCategories");

  const [complementaryCategories, setcomplementaryCategories] = useState();

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    if (subCategoryId)
      run(
        axios
          .get(api.app.ViewComplmentartCategories(subCategoryId))
          .then((res) => {
            setcomplementaryCategories(res?.data?.data);
          })
      );
  }, [run, subCategoryId]);

  const handelOnClick = (id) => {
    history.push(routes.app.ceratitems.addDescription);
  };
  return (
    <div className="text-white max-w-[1500px] mx-auto animate-in relative pb-8">
      <Dimmer
        className=" animate-pulse bg-primary-black-light"
        active={isLoading}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      <div className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12">
        <BreadCrumbAddAds complement={subCategoryId} />
      </div>
      <h1 className="text-center text-6xl pt-12 font-serifCUS">
        {selectedContent[localizationKeys.Nowchoosetherightcategory]}
        <br></br> {selectedContent[localizationKeys.foryourad]}
        <p className="text-primary-gray text-2xl pt-6">
          {
            selectedContent[
              localizationKeys.ConsultantPsychiatristExperienceInAdultPsychiatry
            ]
          }{" "}
          <br></br>
          {
            selectedContent[localizationKeys.AndAddictionMedicineITreatMany]
          }{" "}
        </p>
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-14 mt-20 mx-4  ">
        {complementaryCategories?.map((e) => (
          <Buttoncomplmentart
            id={e?._id}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
          />
        ))}
      </div>
      <div className="flex justify-center mt-20 mb-44 mx-4">
        <button
          onClick={
            complmentartCategoriesID
              ? () => {
                  handelOnClick(complmentartCategoriesID);
                  window.localStorage.setItem(
                    "complment_Id",
                    complmentartCategoriesID
                  );
                }
              : ""
          }
          className="md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
        >
          <div className="flex justify-between px-1 gap-x-2">
            <p className="text-white text-xl md:pt-1 pt-0 w-full text-end">
              {selectedContent[localizationKeys.next]}{" "}
            </p>
            <p className="text-white flex justify-end my-auto md:px-24 px-20 rtl:rotate-180">
              <FaLongArrowAltRight size={25} />
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SelectComplementCategory;
