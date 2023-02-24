import React, { useEffect, useState } from "react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import myProfileImg from "../../../../src/assets/img/my_profile_img.png";
import api from "../../../api";
import ItemCard from "../../../components/home-components/item-card";
import ItemCardSmall from "../../../components/shared/card-item-small";
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import { authAxios } from "../../../config/axios-config";
import { useAuthState } from "../../../context/auth-context";
import useAxios from "../../../hooks/use-axios";
import useFilter from "../../../hooks/use-filter";
import routes from "../../../routes";

const UserProfile = () => {
  const sectionsOne = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={18} className="text-primary-cyan-light pt-1.5" />
        </>
      ),
    },
    { key: "User Account", content: "User Account", active: true },
  ];

  const { logout } = useAuthState();

  const [userProfileData, setUserProfileData] = useState();

  const [status, setStatus] = useFilter("status", "");
  const { search } = useLocation();
  const { userProfileId } = useParams();

  const history = useHistory();

  const { run: runUSerProfile, isLoading: isLoadingUserProfile } = useAxios([]);
  useEffect(() => {
    runUSerProfile(
      authAxios
        .get(api.app.getUserProfile(userProfileId))
        .then((res) => {
          setUserProfileData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [runUSerProfile, userProfileId]);

  return (
    <div className="max-w-[1650px] mx-auto  animate-in relative">
      <Dimmer
        className=" animate-pulse bg-primary-black-light"
        active={isLoadingUserProfile}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      <p className="flex text-white text-2xl mt-14 pb-8 border-b-[1px] border-primary-gray-dark  ">
        User Account
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
        <div className="flex justify-between mx-14">
          {/* left */}
          <div className="flex py-2 ">
            <div className="">
              <p className="w-[116px] h-[116px] border-white border-[1px] mx-auto rounded-full  ">
                {/* <img
                  className="w-[114px] h-[112px] rounded-full object-cover p-1  my-auto "
                  src={myProfileImg}
                  alt="myProfileImg"
                /> */}
                <p className="w-[110px] h-[110px] rounded-full mx-auto mt-0.5 pt-9 text-center text-5xl bg-primary-gray-light text-primary-purple">
                  {userProfileData?.fullName
                    ?.split(" ")[1]
                    ?.substring(0, 1)
                    .toUpperCase() === undefined
                    ? userProfileData?.fullName
                        ?.split(" ")[0]
                        .substring(0, 1)
                        .toUpperCase()
                    : userProfileData?.fullName
                        ?.split(" ")[0]
                        ?.substring(0, 1)
                        .toUpperCase() +
                      userProfileData?.fullName
                        ?.split(" ")[1]
                        ?.substring(0, 1)
                        .toUpperCase()}
                </p>
              </p>
            </div>
            <div className="mx-8 my-auto">
              <p className=" text-white text-4xl font-medium pb-4">
                {userProfileData?.fullName}
              </p>
              <p className="text-white/50 text-2xl">{userProfileData?.email}</p>
            </div>
          </div>
          {/* right */}
          <div className="text-white my-auto">
            <div>
              <h1 className="text-4xl text-center font-medium">
                {userProfileData?.profileViews}
              </h1>
              <p className="text-lg font-medium">Total Page View</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-white flex justify-between flex-wrap  mb-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-5  sm:mx-5 relative  h-fit mx-auto ">
          {viewAllOwner?.map((e) => (
            <ItemCardSmall
              id={e?._id}
              itemImge={e?.images[0]?.img}
              itemName={e?.brand}
              price={e?.price}
              date={new Date(e?.updatedAt).toLocaleDateString("en-GB")}
              adsName={e?.model}
              userName={e?.user?.fullName}
              KM={e?.kiloMeters}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default UserProfile;
