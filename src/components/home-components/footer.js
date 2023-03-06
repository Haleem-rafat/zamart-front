import React from "react";
import googlePlay from "../../../src/assets/icons/google_play_icon.svg";
import appStore from "../../../src/assets/icons/app_store_icon.svg";
import ZAMARTfooter from "../../../src/assets/logo/ZAMART_footer.svg";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { useLanguage } from "../../context/language-context";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const Footer = () => {
  const history = useHistory();

  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  return (
    <div>
      <div>
        <div className="md:grid grid-cols-4 hidden  text-white text-2xl py-9 ltr:md:pl-36 rtl:md:pr-36 ltr:pl-12 rtl:pr-12 ">
          <p>{selectedContent[localizationKeys.Bikesforsale]}</p>
          <p>{selectedContent[localizationKeys.NewsReviews]}</p>
          <p>{selectedContent[localizationKeys.GeneralHelp]}</p>
          <p>{selectedContent[localizationKeys.OurApp]}</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black  text-white py-12 ltr:md:pl-36 rtl:md:pr-36 ltr:pl-12 rtl:pr-12">
          <p className="md:hidden block text-white text-2xl py-4">
            {selectedContent[localizationKeys.Bikesforsale]}
          </p>
          <div>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.Usedbikesforsale]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.Newbikesforsale]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {" "}
                {selectedContent[localizationKeys.BikeFactsHistoryReports]}
              </span>
            </li>
          </div>
          <div>
            <p className="md:hidden block text-white text-2xl py-4">
              {selectedContent[localizationKeys.NewsReviews]}
            </p>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {" "}
                {selectedContent[localizationKeys.BikeNews]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.BikeReviews]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.BikeAdvice]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.BikeVideos]}
              </span>
            </li>
          </div>
          <div>
            <p className="md:hidden block text-white text-2xl py-4">
              {selectedContent[localizationKeys.GeneralHelp]}
            </p>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.TermsConditions]}
              </span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">
                {selectedContent[localizationKeys.Privacy]}
              </span>
            </li>
            <li
              onClick={() => history.push(routes.app.contactUs)}
              className="text-primary-cyan-light py-1.5 cursor-pointer"
            >
              <span className="text-white">
                {selectedContent[localizationKeys.ContactUs]}
              </span>
            </li>
            <li
              onClick={() => history.push(routes.app.aboutUs)}
              className="text-primary-cyan-light py-1.5 cursor-pointer"
            >
              <span className="text-white">
                {selectedContent[localizationKeys.AboutUs]}
              </span>
            </li>
          </div>
          <div>
            <p className="md:hidden block text-white text-2xl py-4">
              {selectedContent[localizationKeys.OurApp]}
            </p>
            <p className="text-2xl">
              {selectedContent[localizationKeys.Downloadtheappnow]}
            </p>
            <p className="text-2xl pt-1">
              {selectedContent[localizationKeys.OnAppStoreGooglePlay]}
            </p>
            <div className="flex gap-x-5 pt-5">
              <img
                className="w-40 h-16 cursor-pointer"
                src={googlePlay}
                alt="googlePlay"
              />
              <img
                className="w-40 h-16 cursor-pointer"
                src={appStore}
                alt="app store"
              />
            </div>
          </div>
        </div>
        <div className="h-14 flex justify-center ">
          <img className="w-44" src={ZAMARTfooter} alt="ZAMARTfooter" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
