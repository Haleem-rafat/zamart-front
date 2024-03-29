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
import ZamartLoading from "../shared/lotties/zamart-loading";

import { RiNotification3Line } from "react-icons/ri";
import { useAuthState } from "../../context/auth-context";
import { toast } from "react-hot-toast";
import Headermob from "./header-mob";
import DropdownLang from "../shared/drop-down-lang";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const HeaderHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [SubCategories, setSubCategories] = useState();
  const [sameId, setSameId] = useState();
  const [myProfileData, setMyProfileData] = useState();
  const [notificationsData, setNotificationsData] = useState();
  const [isTN, setIsTN] = useState();
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");
  const [subCategoriesFilter, setSubCategoriesFilter] = useFilter(
    "subCategory",
    ""
  );

  const { user } = useAuthState();

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
            setCategoriesFiter(categories && categories[0]?._id);
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

  const { run: runnotifications, isLoading: isLoadingnotifications } = useAxios(
    []
  );
  useEffect(() => {
    runnotifications(
      authAxios
        .get(api.notifications.default)
        .then((res) => {
          setNotificationsData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [runnotifications]);

  const [noti, setnoti] = useState(false);
  const handelNoti = () => {
    setnoti(!noti);
  };

  const handelAddNewSell = () => {
    if (user) {
      history.push(routes.app.ceratitems.selectCategory);
    } else {
      toast.error(
        lang === "en"
          ? "You must be logged in to add new sell"
          : "يجب عليك تسجيل الدخول لإضافة بيع جديد"
      );
      dispatch(On());
    }
  };

  const { run: runred, isLoading: isLoadingred } = useAxios([]);
  const handelClickMas = (CL_id, NO_id) => {
    runred(
      authAxios
        .patch(api.notifications.read(NO_id))
        .then((res) => {
          history.push(routes.app.viewItemById(CL_id));
          setnoti(false);
        })
        .catch((err) => console.log(err))
    );
  };

  return (
    <div>
      <div className="sm:block hidden">
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
                onClick={handelAddNewSell}
                className="md:w-56 w-32 md:h-16 h-10 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl md:mt-6 mt-8"
              >
                <div className="flex justify-center px-1 gap-x-2">
                  <img
                    className="w-4 md:w-auto"
                    src={plusIcon}
                    alt="plusIcon"
                  />
                  <p className="text-white text-xs md:text-xl md:pt-1 pt-0">
                    {selectedContent[localizationKeys.SELL]}
                  </p>
                </div>
              </button>
            </div>
            {/* auth sidare button */}
            <div
              onClick={
                myProfileData?.fullName
                  ? () => history.push(routes.app.myProfile)
                  : () => dispatch(On())
              }
              className="flex  cursor-pointe ml-12 mr-12 mt-2"
            >
              <p
                className={
                  myProfileData?.fullName
                    ? "w-16 h-16 rounded-full mx-auto mt-4 pt-3.5 text-center text-3xl bg-primary-gray-light text-primary-purple cursor-pointer"
                    : "hidden"
                }
              >
                {myProfileData?.fullName
                  ?.split(" ")[1]
                  ?.substring(0, 1)
                  .toUpperCase() === undefined
                  ? myProfileData?.fullName
                      ?.split(" ")[0]
                      .substring(0, 1)
                      .toUpperCase()
                  : myProfileData?.fullName
                      ?.split(" ")[0]
                      ?.substring(0, 1)
                      .toUpperCase() +
                    myProfileData?.fullName
                      ?.split(" ")[1]
                      ?.substring(0, 1)
                      .toUpperCase()}
              </p>
              <div className="md:mt-6 mt-9 ltr:ml-4 rtl:mr-4 cursor-pointer">
                <p className="text-primary-cyan-light md:text-sm text-xs font-normal">
                  {selectedContent[localizationKeys.Welcome]}
                </p>
                <p className="text-white md:text-2xl text-sm font-medium relative">
                  {myProfileData?.fullName
                    ? myProfileData?.fullName
                    : selectedContent[localizationKeys.LOGIN]}
                </p>
              </div>
            </div>
            <div className={user ? "my-auto" : "hidden"}>
              <div
                onClick={handelNoti}
                className="text-white my-auto ltr:ml-14 rtl:mr:14 relative cursor-pointer"
              >
                <p
                  className={`${
                    notificationsData?.map((e) => e?.isRead === false)
                      ? "bg-[#E4576C] w-3 h-3 rounded-full absolute top-0 right-0"
                      : "hidden"
                  }`}
                ></p>
                <RiNotification3Line size={30} />
              </div>
              <div
                className={
                  noti
                    ? "bg-white w-96 h-auto absolute z-20 top-24 ltr:right-28 rtl:left-28 rounded-lg"
                    : "hidden"
                }
              >
                <div>
                  {notificationsData?.map((e) => (
                    <div className="border-b-2 py-2 mx-4">
                      <p
                        className={`${
                          notificationsData?.isRead
                            ? "bg-white"
                            : " hover:bg-white cursor-pointer rounded"
                        }  text-black text-center p-2 py-2 text-xl `}
                        onClick={() => handelClickMas(e?.clickableItem, e?._id)}
                      >
                        {lang === "en"
                          ? e?.message?.enBody
                          : e?.message?.arBody}
                      </p>
                    </div>
                  ))}
                </div>
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
              <ZamartLoading />
            </Dimmer>
            {SubCategories?.map((e) => (
              <div
                onClick={() => {
                  history.push(
                    `${routes.app.searchPage}?category=${categoriesFilter}&subCategory=${e?._id}`
                  );
                  setSubCategoriesFilter(e?._id);
                  setSameId(e?._id);
                }}
                id={e?._id}
                className={`${
                  e?._id === subCategoriesFilter
                    ? "w-72 h-[76px] pt-7  text-center cursor-pointer border-r-[1px] hidden md:block"
                    : "w-72 h-[76px] pt-7 text-center cursor-pointer border-r-[1px] hidden md:block text-black"
                }`}
              >
                {lang === "en" ? e?.nameEn : e?.nameAr}
              </div>
            ))}

            <div className="w-72 md:h-[76px] h-[40px] md:pt-6 pt-3 text-center border-x-[1px]">
              <Dropdown
                className="px-5 "
                text={selectedContent[localizationKeys.AllCategories]}
              >
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
            <div className="w-72 md:h-[76px] h-[40px] md:pt-6 pt-3 text-center border-l-[1px]">
              <DropdownLang />
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <Headermob />
      </div>
    </div>
  );
};

export default HeaderHome;
