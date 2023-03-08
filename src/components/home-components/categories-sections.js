import React, { useEffect, useState } from "react";
import CategoriesCard from "./categories-card";
import googlePlay from "../../../src/assets/icons/google_play_icon.svg";
import appStore from "../../../src/assets/icons/app_store_icon.svg";
import useAxios from "../../hooks/use-axios";
import axios from "axios";
import api from "../../api";
import { useLanguage } from "../../context/language-context";
import { Dimmer, Loader } from "semantic-ui-react";
import ZamartLoading from "../shared/lotties/zamart-loading";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const CategoriesSections = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];

  const [categories, setCategories] = useState();
  const { run, isLoading } = useAxios([]);

  useEffect(() => {
    run(
      axios.get(api.app.viewCategories).then((res) => {
        setCategories(res?.data?.data);
      })
    );
  }, [run]);

  return (
    <div className="w-full relative">
      <Dimmer
        className=" animate-pulse bg-primary-black-light h-[534px]"
        active={isLoading}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      {/* Categories Sections */}
      <div className="flex flex-col md:flex-row justify-between gap-x-8 gap-y-8 mx-8 my-5">
        {categories?.map((e) => (
          <CategoriesCard
            id={e?._id}
            img={e?.image}
            lable={lang === "en" ? e?.nameEn : e?.nameAr}
            info={e?.description}
          />
        ))}
      </div>
      {/* google play and app store */}
      <div className="flex md:flex-row flex-col justify-between bg-black mx-8 py-12 h-auto md:px-24 px-4 ">
        <div className="text-white my-auto ">
          <p className="md:text-5xl text-2xl font-light">
            {selectedContent[localizationKeys.Findamazingdealsonthego]}
          </p>
          <p className="md:text-xl text-lg md:pt-4 pt-2">
            {selectedContent[localizationKeys.Downloadtheappnow]}
          </p>
        </div>
        <div className="flex mx-auto md:mx-0 gap-x-5 md:gap-x-0 my-auto pt-4">
          <img
            className="md:w-56 w-40 h-16 cursor-pointer"
            src={googlePlay}
            alt="googlePlay"
          />
          <img
            className="md:w-56 w-40 h-16 cursor-pointer"
            src={appStore}
            alt="app store"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesSections;
