import React, { useEffect } from "react";

import aboutus from "../../../../src/assets/img/about-us.png";
import { useLanguage } from "../../../context/language-context";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";
const AboutUs = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="md:flex grid grid-cols-1 justify-between  my-5 animate-in">
      <div className="sm:mx-40 mx-8 sm:mt-40 mt-8 mb-8">
        <p className="text-primary-gray text-xl font-normal">
          {selectedContent[localizationKeys.OURSTORY]}
        </p>
        <h1 className=" text-white text-7xl pt-2 pb-12">
          {" "}
          {selectedContent[localizationKeys.AboutUs]}
        </h1>
        <p className="text-primary-gray  text-xl font-normal">
          {
            selectedContent[
              localizationKeys.itisalongestablishedfactthatareaderwillbe
            ]
          }
          <br></br>
          {selectedContent[localizationKeys.distractedbythereadablecontent]}
          <br></br> {selectedContent[localizationKeys.loremipsumisthatithasa]}
          <br></br> {selectedContent[localizationKeys.TALKTOUS]}
        </p>
        s{" "}
        <p className="text-primary-gray text-xl font-normal py-12">
          <p className="text-primary-gray  text-xl font-normal">
            {
              selectedContent[
                localizationKeys.itisalongestablishedfactthatareaderwillbe
              ]
            }
            <br></br>
            {selectedContent[localizationKeys.distractedbythereadablecontent]}
            <br></br> {selectedContent[localizationKeys.loremipsumisthatithasa]}
            <br></br> {selectedContent[localizationKeys.TALKTOUS]}
          </p>
        </p>
        <p className="text-primary-gray text-xl font-normal">
          <p className="text-primary-gray text-xl font-normal">
            {
              selectedContent[
                localizationKeys.itisalongestablishedfactthatareaderwillbe
              ]
            }
            <br></br>
            {selectedContent[localizationKeys.distractedbythereadablecontent]}
            <br></br> {selectedContent[localizationKeys.loremipsumisthatithasa]}
            <br></br> {selectedContent[localizationKeys.TALKTOUS]}
          </p>
        </p>
      </div>
      <div>
        <img
          className="w-full h-full object-cover"
          src={aboutus}
          alt="aboutus"
        />
      </div>
    </div>
  );
};

export default AboutUs;
