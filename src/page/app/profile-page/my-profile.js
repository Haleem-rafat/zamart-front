import React, { useEffect, useState } from "react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";
import { Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import myProfileImg from "../../../../src/assets/img/my_profile_img.png";
import api from "../../../api";
import ItemCard from "../../../components/home-components/item-card";
import ItemCardSmall from "../../../components/shared/card-item-small";
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import PaginationApp from "../../../components/shared/pagination";
import { authAxios } from "../../../config/axios-config";
import { useAuthState } from "../../../context/auth-context";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import useFilter from "../../../hooks/use-filter";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";
import routes from "../../../routes";

const MyProfile = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  const sectionsOne = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={18} className="text-primary-cyan-light pt-1.5" />
        </>
      ),
    },
    {
      key: "My Account",
      content: selectedContent[localizationKeys.MyAccout],
      active: true,
    },
  ];

  const { logout } = useAuthState();

  const [myProfileData, setMyProfileData] = useState();
  const [viewAllOwner, setViewAllOwner] = useState();
  const [viewItemsAnalytics, setViewItemsAnalytics] = useState();
  const [pagenationData, setPagenationData] = useState();

  const [status, setStatus] = useFilter("status", "");
  const { search } = useLocation();

  const history = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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

  const { run: runviewAllOwner, isLoading: isLoadingviewAllOwner } = useAxios(
    []
  );
  useEffect(() => {
    runviewAllOwner(
      authAxios
        .get(`${api.app.viewAllOwner}${search}`)
        .then((res) => {
          setViewAllOwner(res?.data?.data);
          setPagenationData(res?.data?.totalPages);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [runviewAllOwner, search]);

  const { run: runviewItemsAnalytics, isLoading: isLoadingviewItemsAnalytics } =
    useAxios([]);
  useEffect(() => {
    runviewItemsAnalytics(
      authAxios
        .get(api.app.viewItemsAnalytics)
        .then((res) => {
          setViewItemsAnalytics(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [runviewItemsAnalytics]);

  console.log("====================================");
  console.log(myProfileData);
  console.log(viewAllOwner);
  console.log(viewItemsAnalytics);
  console.log("====================================");

  return (
    <div className="max-w-[1650px] mx-auto  animate-in relative">
      <Dimmer
        className=" animate-pulse bg-primary-black-light"
        active={
          isLoadingMyProfile ||
          isLoadingviewAllOwner ||
          isLoadingviewItemsAnalytics
        }
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      <p className="flex text-white text-2xl mt-14 pb-8 border-b-[1px] border-primary-gray-dark  ">
        {selectedContent[localizationKeys.MyAccout]}
        <span>
          <Breadcrumb
            className="w-full ml-2 text-white "
            icon="right angle"
            sections={sectionsOne}
          />
        </span>
      </p>
      <div className="relative py-6 my-16">
        <img
          className="w-full h-full object-cover absolute top-0 bottom-0 -z-10 "
          src={myProfileImg}
          alt="myProfileImg"
        />
        <div className="flex sm:justify-between justify-center flex-wrap sm:mx-14 mx-auto">
          {/* left */}
          <div className="sm:flex block  py-2 ">
            <div className="">
              <p className="w-[116px] h-[116px] border-white border-[1px] mx-auto rounded-full  ">
                {/* <img
                  className="w-[114px] h-[112px] rounded-full object-cover p-1  my-auto "
                  src={myProfileImg}
                  alt="myProfileImg"
                /> */}
                <p className="w-[110px] h-[110px] rounded-full mx-auto mt-0.5 pt-9 text-center text-5xl bg-primary-gray-light text-primary-purple">
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
              </p>
            </div>
            <div className="mx-8 my-auto  ">
              <p className=" text-white sm:text-4xl text-2xl font-medium pb-4 text-center">
                {myProfileData?.fullName}
              </p>
              <p className="text-white/50 sm:text-2xl text-xl">
                {myProfileData?.email}
              </p>
            </div>
          </div>
          {/* right */}
          <div className="text-white my-auto mx-auto sm:mx-0">
            <div>
              <h1 className="text-4xl text-center font-medium">
                {myProfileData?.profileViews}
              </h1>
              <p className="text-lg font-medium">
                {" "}
                {selectedContent[localizationKeys.TotalPageView]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white flex justify-between flex-col sm:flex-row mb-8">
        <div className="bg-black w-[266px] h-fit rounded-xl mx-auto overflow-hidden ">
          {viewItemsAnalytics?.map((e) => (
            <div
              key={e?._id}
              onClick={() => setStatus(e?.status)}
              className={`${
                status === e?.status ? "bg-primary-cyan-med text-white" : ""
              } group flex justify-between text-2xl p-9 cursor-pointer `}
            >
              {/* REJECTED-PENDING-PUBLISHED-DRAFTED-EXPIRED */}
              <p>
                {e?.status === "REJECTED"
                  ? selectedContent[localizationKeys.REJECTED]
                  : e?.status === "PENDING"
                  ? selectedContent[localizationKeys.PENDING]
                  : e?.status === "PUBLISHED"
                  ? selectedContent[localizationKeys.PUBLISHED]
                  : e?.status === "DRAFTED"
                  ? selectedContent[localizationKeys.DRAFTED]
                  : selectedContent[localizationKeys.EXPIRED]}
              </p>
              <p
                className={`${
                  status === e?.status ? "text-white" : "group-hover:text-white"
                } text-primary-pink-light `}
              >{`(${e?.count})`}</p>
            </div>
          ))}
          <div
            onClick={() => {
              logout();
              window.location.reload();
            }}
            className="text-2xl flex gap-x-3 p-8 mx-auto cursor-pointer"
          >
            <FiLogOut size={30} className="text-primary-cyan-med" />
            <p> {selectedContent[localizationKeys.logout]}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-5  sm:mx-5 relative  h-fit mx-auto ">
          {viewAllOwner?.map((e) => (
            <ItemCardSmall
              id={e?._id}
              itemImge={e?.images[0]?.img}
              adsName={e?.brand}
              price={e?.price}
              date={new Date(e?.updatedAt).toLocaleDateString("en-GB")}
              itemName={e?.model}
              userName={e?.user?.fullName}
              KM={e?.kiloMeters}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-10 mt-3 ">
        <PaginationApp totalPages={pagenationData} totalItem={8} />
      </div>
    </div>
  );
};

export default MyProfile;
