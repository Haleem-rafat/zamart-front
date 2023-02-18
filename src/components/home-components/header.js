import React, { useEffect, useState } from "react";

import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import ZAMARTname from "../../../src/assets/logo/ZAMART_name.svg";
import plusIcon from "../../../src/assets/icons/plus-icon.svg";
import { Dimmer, Dropdown, Icon, Loader } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { On } from "../../redux/sidebare-slice.js";
import routes from "../../routes";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/use-axios";
import { authAxios, axios } from "../../config/axios-config";

import api from "../../api";
import { useLanguage } from "../../context/language-context";
import useFilter from "../../hooks/use-filter";

const HeaderHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [SubCategories, setSubCategories] = useState();
  const [sameId, setSameId] = useState();
  const [myProfileData, setMyProfileData] = useState();
  const [lang] = useLanguage("");
  const [categoriesFilter, setCategoriesFiter] = useFilter("categories", "");
  const [subCategoriesFilter, setSubCategoriesFilter] = useFilter(
    "subCategories",
    ""
  );

  const onRouteClick = ({ route }) => {
    const anchor = document.querySelector(route);
    anchor.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const { run, isLoading } = useAxios([]);

  const { run: rungetSubCategories, isLoading: isLoadinggetSubCategories } =
    useAxios([]);

  useEffect(() => {
    run(
      axios.get(api.app.viewCategories).then((res) => {
        setCategories(res?.data?.data);
      })
    );
    if (categories)
      rungetSubCategories(
        axios
          .get(api.app.viewSubCategories(categories && categories[0]?._id))
          .then((res) => {
            setSubCategories(res?.data?.data);
          })
      );
  }, [run, rungetSubCategories, categories?.length && categories[0]?._id]);

  const getSubCategories = (categoriesId) => {
    rungetSubCategories(
      axios.get(api.app.viewSubCategories(categoriesId)).then((res) => {
        setSubCategories(res?.data?.data);
      })
    );
  };

  const { run: runMyProfile, isLoading: isLoadingMyProfile } = useAxios([]);
  useEffect(() => {
    runMyProfile(
      authAxios
        .get(api.app.getMyProfile)
        .then((res) => {
          setMyProfileData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [runMyProfile]);

  return (
    <div className="">
      <div className="flex justify-between  md:mx-28 mx-2 h-[95px]">
        {/*  ZAMART logo */}
        <div
          onClick={() => {
            history.push(routes.app.home);
          }}
          className="flex cursor-pointer"
        >
          <img
            className="md:h-[40px] h-[30px] my-8"
            src={ZAMARTlogo}
            alt="ZAMARTlogo"
          />
          <img
            className="md:h-[26px] h-[15px] mt-11 mx-4"
            src={ZAMARTname}
            alt="ZAMARTname"
          />
        </div>
        {/* button and auth sidare */}
        <div className="flex">
          {/* button */}
          <div>
            <button
              onClick={() => {
                history.push(routes.app.ceratitems);
              }}
              className="md:w-56 w-32 md:h-16 h-10 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl md:mt-6 mt-8"
            >
              <div className="flex justify-center px-1 gap-x-2">
                <img className="w-4 md:w-auto" src={plusIcon} alt="plusIcon" />
                <p className="text-white text-xs md:text-xl md:pt-1 pt-0">
                  SELL MY BIKE
                </p>
              </div>
            </button>
          </div>
          {/* auth sidare button */}
          <div>
            <div
              onClick={
                myProfileData?.fullName
                  ? () => history.push(routes.app.myProfile)
                  : () => dispatch(On())
              }
              className="md:mt-6 mt-9 ml-12 cursor-pointer"
            >
              <p className="text-primary-cyan-light md:text-sm text-xs font-normal">
                Welcome
              </p>
              <p className="text-white md:text-2xl text-sm font-medium relative">
                <Dimmer className="animate-pulse" active={isLoadingMyProfile}>
                  <Loader active />
                </Dimmer>
                {myProfileData?.fullName
                  ? myProfileData?.fullName
                  : "User Login"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white md:h-[76px] h-[40px]">
        <div className=" flex justify-center text-primary-black-light text-xl relative">
          <Dimmer
            className="animate-pulse"
            active={isLoadinggetSubCategories}
            inverted
          >
            <Loader active />
          </Dimmer>
          {SubCategories?.map((e) => (
            <a
              href="#Categories"
              onClick={() => {
                setSubCategoriesFilter(e?._id);
                setSameId(e?._id);
                onRouteClick();
              }}
              id={e?._id}
              className={`${
                e?._id === sameId
                  ? "w-72 h-[76px] pt-7 bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white text-center cursor-pointer border-r-2 hidden md:block"
                  : "w-72 h-[76px] pt-7 text-center cursor-pointer border-r-2 hidden md:block text-black"
              }`}
            >
              {lang === "en" ? e?.nameEn : e?.nameAr}
            </a>
          ))}

          <div className="w-72 md:h-[76px] h-[40px] md:pt-6 pt-3 text-center border-x-2">
            <Dropdown className="px-5 " text="All Categories">
              <Dropdown.Menu className="w-48 ">
                {categories?.map((e) => (
                  <Dropdown.Item
                    className="text-xl"
                    text={lang === "en" ? e?.nameEn : e?.nameAr}
                    onClick={() => {
                      getSubCategories(e?._id);
                      setCategoriesFiter(e?._id);
                    }}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className=" w-72 md:h-[76px] h-[40px] md:pt-6 pt-3 text-center border-l-2">
            <Dropdown icon="world" text="lang" direction="left">
              <Dropdown.Menu>
                <Dropdown.Item className="text-xl" text="En" />
                <Dropdown.Item className="text-xl" text="Ar" />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
