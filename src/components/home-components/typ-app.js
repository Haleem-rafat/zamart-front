import React from "react";
import tryAppCar from "../../../src/assets/img/try_app_car.png";
import { useLanguage } from "../../context/language-context";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";
const TryApp = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  return (
    <div>
      <div className="text-white mt-28 ">
        <div className="w-full h-[450px] ltr:md:pl-40 rtl:md:pr-40 ltr:pl-6 rtl:pr-6 bg-gradient-to-t from-primary-black absolute z-10">
          <p className="md:text-7xl text-4xl pt-36 ">
            {selectedContent[localizationKeys.TRY]} ZAMART APP
          </p>
          <p className="md:text-2xl text-lg pt-6 ">
            {
              selectedContent[
                localizationKeys.Anewexperienceintheworldofsecondhandpurchase
              ]
            }
          </p>
          <button className="w-52 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl mt-6">
            <div className="flex justify-center gap-x-2">
              <p className="text-white">
                {selectedContent[localizationKeys.TAKEALOOK]}
              </p>
            </div>
          </button>
        </div>
        <img
          className="w-full h-[450px] object-cover relative "
          src={tryAppCar}
          alt="tryAppCar"
        />
      </div>
    </div>
  );
};

export default TryApp;
