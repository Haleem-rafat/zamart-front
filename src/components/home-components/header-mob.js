import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import api from "../../api";
import { authAxios } from "../../config/axios-config";
import useAxios from "../../hooks/use-axios";
import routes from "../../routes";
import { useDispatch } from "react-redux";
import { On } from "../../redux/sidebare-slice.js";
import { useHistory } from "react-router-dom";
import useGetGatogry from "../../hooks/use-get-gatogry";
import { Dimmer, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useLanguage } from "../../context/language-context";
import useFilter from "../../hooks/use-filter";
import ZamartLoading from "../shared/lotties/zamart-loading";
import { useAuthState } from "../../context/auth-context";
import { toast } from "react-hot-toast";
import plusIcon from "../../../src/assets/icons/plus-icon.svg";
import DropdownLang from "../shared/drop-down-lang";
import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import ZAMARTname from "../../../src/assets/logo/ZAMART_name.svg";

const Headermob = () => {
  const [lang] = useLanguage("");

  const [nav, setNave] = useState(false);
  const [myProfileData, setMyProfileData] = useState();
  const [CatID, setGatogryId] = useState();
  const [SubCategories, setSubCategories] = useState();
  const [categories, setCategories] = useState();

  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");

  const dispatch = useDispatch();
  const history = useHistory();

  const handelNav = () => {
    setNave(!nav);
  };

  const { GatogryOptions, loadingGatogry } = useGetGatogry();

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

  const { run: rungetSubCategories, isLoading: isLoadinggetSubCategories } =
    useAxios([]);
  const { run, isLoading } = useAxios([]);

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

  const { user } = useAuthState();

  const handelAddNewSell = () => {
    if (user) {
      history.push(routes.app.ceratitems.selectCategory);
      setNave(false);
    } else {
      toast.error("You must be logged in to add new sell");
      dispatch(On());
    }
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between mx-2 ">
        <div className="" onClick={handelNav}>
          <p className="text-white py-6">
            {nav ? (
              <AiOutlineClose size={40} className=" text-white" />
            ) : (
              <AiOutlineMenu size={40} className=" text-white" />
            )}
          </p>
        </div>
        <div
          onClick={() => {
            history.push(routes.app.home);
            setNave(false);
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
      </div>

      <div
        className={
          nav
            ? "bg-primary-black-light h-screen z-20 relative  overflow-y-auto"
            : "hidden"
        }
      >
        <Dimmer
          className="animate-pulse bg-primary-black-light"
          active={isLoadinggetSubCategories}
          inverted
        >
          <ZamartLoading />
        </Dimmer>
        <div className="flex justify-start">
          <div
            onClick={
              myProfileData?.fullName
                ? () => {
                    history.push(routes.app.myProfile);
                    setNave(false);
                  }
                : () => dispatch(On())
            }
            className="flex cursor-pointe m-5 "
          >
            <p
              className={
                "w-16 h-16 rounded-full mx-auto mt-4 pt-3.5 text-center text-3xl bg-primary-gray-light text-primary-purple cursor-pointer"
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
            <div className="md:mt-6 mt-9 ml-4 cursor-pointer">
              <p className="text-primary-cyan-light md:text-sm text-xs font-normal">
                Welcome
              </p>
              <p className="text-white md:text-2xl text-sm font-medium relative">
                {myProfileData?.fullName ? myProfileData?.fullName : "Login"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white mx-5 rounded-xl ">
            <Dropdown
              className="px-5 py-6 flex justify-center text-3xl bg-transparent  "
              text="All Categories"
            >
              <Dropdown.Menu className="w-full ">
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
        </div>
        <div>
          <h1 className="text-2xl text-white mx-5 mt-6">Sub Categories</h1>
          {SubCategories?.map((e) => (
            <p
              onClick={() => {
                history.push(
                  `${routes.app.searchPage}?category=${categoriesFilter}&subCategory=${e?._id}`
                );
                setNave(false);
              }}
              className="bg-white my-6 p-4 rounded-xl text-xl mx-5"
            >
              {lang === "en" ? e?.nameEn : e.nameAr}
            </p>
          ))}
        </div>
        <div>
          {/* button */}
          <h1 className="text-2xl text-white mx-5 mt-6">Add New Sell</h1>
          <div>
            <button
              onClick={handelAddNewSell}
              className="w-56  h-16  rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl  mx-3 mt-2"
            >
              <div className="flex justify-center px-1 gap-x-2">
                <img className="w-4 md:w-auto" src={plusIcon} alt="plusIcon" />
                <p className="text-white text-lg">SELL MY BIKE</p>
              </div>
            </button>
          </div>
          <h1 className="text-2xl text-white mx-5 mt-6">Select language</h1>
          <div className="mx-4 mt-8 pb-4">
            <DropdownLang />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headermob;
