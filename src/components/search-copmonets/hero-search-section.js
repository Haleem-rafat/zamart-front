import React, { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { Dropdown, Form, Input } from "semantic-ui-react";
import homeCarImg from "../../../src/assets/img/hero_search_img.png";
import useGetBrand from "../../hooks/use-get-brand";
import useGetGatogry from "../../hooks/use-get-gatogry";
import useGetModel from "../../hooks/use-get-model";
import useGetCities from "../../hooks/use-get-cities";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const HeroSearchSection = () => {
  const [CatID, setGatogryId] = useState();
  const [brandId, setBrandId] = useState();
  const [brandVal, setBrandVal] = useState();
  const [modeVal, setModeVal] = useState();
  const [keyword, setKeyword] = useState();
  const [cities, setCities] = useState();
  const [usage, setUsage] = useState();

  const { GatogryOptions, loadingGatogry } = useGetGatogry();
  const { BrandOptions, loadingBrand } = useGetBrand({ CatID });
  const { ModelOptions, loadingModel } = useGetModel({ brandId });
  const { citiesOptions, loadingcitiesOptions } = useGetCities();

  const usageOptions = [
    {
      key: "used",
      text: "Used",
      value: "used",
    },
    {
      key: "new",
      text: "New",
      value: "new",
    },
  ];

  const history = useHistory();

  return (
    <div>
      <div className="text-white ">
        <div className="w-full h-[342px] bg-gradient-to-r from-primary-black absolute z-10">
          <div className="flex justify-center flex-wrap gap-x-2 mt-24">
            <div className="backdrop-blur-xl bg-gradient-to-r from-white/70 bg-white/40 lg:w-[730px] w-full lg:h-[84px] h-full z-10">
              <div className="flex justify-between mx-8 pt-2 flex-wrap  text-primary-black-light text-xl z-20">
                <div>
                  <Dropdown
                    className="bg-transparent outline-none border-none Edit_Dropdown_Search "
                    placeholder="Type"
                    selection
                    clearable
                    search
                    compact
                    loading={loadingGatogry}
                    options={GatogryOptions}
                    onChange={(e, { value }) => setGatogryId(value)}
                  />
                  <p className="text-base text-gray-500 pl-4">Choose Type</p>
                </div>
                <div>
                  <Dropdown
                    className="bg-transparent outline-none border-none Edit_Dropdown_Search "
                    placeholder="Make"
                    selection
                    clearable
                    compact
                    search
                    loading={loadingBrand}
                    options={BrandOptions}
                    onChange={(e, { value }) => {
                      setBrandId(value);
                      setBrandVal(e.target.textContent);
                    }}
                  />
                  <p className="text-base text-gray-500 pl-4">Choose make</p>
                </div>
                <div>
                  <Dropdown
                    className="bg-transparent outline-none border-none Edit_Dropdown_Search "
                    placeholder="Model"
                    selection
                    clearable
                    search
                    compact
                    loading={loadingModel}
                    options={ModelOptions}
                    onChange={(e, { value }) =>
                      setModeVal(e.target.textContent)
                    }
                  />
                  <p className="text-base text-gray-500 pl-4">Choose year</p>
                </div>
                <div>
                  <div>
                    <Input
                      className="Edit_Input  mt-0.5 "
                      placeholder="Keyword..."
                      onChange={(e, { value }) => setKeyword(value)}
                    />
                  </div>
                  <p className="text-base text-gray-500 mt-0.5 pl-4">
                    Ex: KIA 2010
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                history.push(
                  `${routes.app.searchPage}?category=${CatID || ""}&brand=${
                    brandVal || ""
                  }&model=${modeVal || ""}&title=${keyword || ""}&city=${
                    cities || ""
                  }&usage=${usage || ""}`
                )
              }
              className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl lg:w-[230px] w-full h-[80px]"
            >
              <div className="flex justify-center gap-x-2">
                <SlMagnifier size={30} />
                <p className="text-2xl">SEARCH NOW</p>
              </div>
            </button>
          </div>
          <div className="flex justify-center flex-wrap">
            <div className="backdrop-blur-md bg-gradient-to-r from-white/80 bg-white/25 lg:w-[967px] w-full lg:h-[30px] h-auto mt-[1px] ">
              <div className="flex gap-x-[45px] mx-[30px] pt-2 text-primary-black-light z-20">
                <div>
                  <Dropdown
                    className="bg-transparent outline-none border-none py-0 Edit_Dropdown_Location "
                    placeholder="Location"
                    selection
                    clearable
                    fluid
                    compact
                    loading={loadingcitiesOptions}
                    options={citiesOptions}
                    onChange={(e, { value }) => setCities(value)}
                  />
                </div>
                <div>
                  <Dropdown
                    className="bg-transparent outline-none border-none py-0 Edit_Dropdown_Location "
                    placeholder="New & Used"
                    selection
                    clearable
                    fluid
                    compact
                    options={usageOptions}
                    onChange={(e, { value }) => setUsage(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-full  h-[342px] relative object-cover "
          src={homeCarImg}
          alt="homeCareImg"
        />
      </div>
    </div>
  );
};

export default HeroSearchSection;
