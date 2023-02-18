import React, { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import myProfileImg from "../../src/assets/img/my_profile_img.png";
import api from "../api";
import ItemCard from "../components/home-components/item-card";
import { authAxios } from "../config/axios-config";
import useAxios from "../hooks/use-axios";

const MyProfile = () => {
  const sectionsOne = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={18} className="text-primary-cyan-light pt-1.5" />
        </>
      ),
    },
    { key: "My Account", content: "My Account", active: true },
  ];

  const [myProfileData, setMyProfileData] = useState();

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
    <div className="max-w-[1650px] mx-auto  animate-in relative">
      <Dimmer className=" animate-pulse" active={isLoadingMyProfile}>
        <Loader active />
      </Dimmer>
      <p className="flex text-white text-2xl mt-14 pb-8 border-b-[1px] border-primary-gray-dark  ">
        My Account
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
            <div className="mx-8 my-auto">
              <p className=" text-white text-4xl font-medium pb-4">
                {myProfileData?.fullName}
              </p>
              <p className="text-white/50 text-2xl">{myProfileData?.email}</p>
            </div>
          </div>
          {/* right */}
          <div className="text-white my-auto">
            <div>
              <h1 className="text-4xl text-center font-medium">
                {myProfileData?.profileViews}
              </h1>
              <p className="text-lg font-medium">Total Page View</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white flex justify-between flex-wrap  sm:h-screen h-full mb-8">
        <div className="bg-red-300  w-[266px] h-[480px] mx-auto ">left</div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-10 gap-x-5  sm:mx-5 relative  sm:h-[534px] h-full mx-auto ">
          {/* <Dimmer className=" animate-pulse h-[534px]" active={"isLoading"}>
              <Loader active />
            </Dimmer> */}
          <ItemCard
            itemImge={""}
            itemName={"test"}
            price={"test"}
            date={"test"}
            adsName={"test"}
            userName={"test"}
            KM={"test"}
            isSmall={true}
          />
          <ItemCard
            itemImge={""}
            itemName={"test"}
            price={"test"}
            date={"test"}
            adsName={"test"}
            userName={"test"}
            KM={"test"}
            isSmall={true}
          />
          <ItemCard
            itemImge={""}
            itemName={"test"}
            price={"test"}
            date={"test"}
            adsName={"test"}
            userName={"test"}
            KM={"test"}
            isSmall={true}
          />
          <ItemCard
            itemImge={""}
            itemName={"test"}
            price={"test"}
            date={"test"}
            adsName={"test"}
            userName={"test"}
            KM={"test"}
            isSmall={true}
          />
          <ItemCard
            itemImge={""}
            itemName={"test"}
            price={"test"}
            date={"test"}
            adsName={"test"}
            userName={"test"}
            KM={"test"}
            isSmall={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
