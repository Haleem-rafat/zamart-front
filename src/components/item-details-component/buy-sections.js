import React, { useState } from "react";
import { toast, ToastBar } from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Modal } from "semantic-ui-react";
import api from "../../api";
import { authAxios } from "../../config/axios-config";
import { useAuthState } from "../../context/auth-context";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";
import routes from "../../routes";
import { On } from "../../redux/sidebare-slice.js";
import profileBG from "../../../src/assets/img/profile_BG.png";
import copyicon from "../../../src/assets/icons/copy_icon.svg";
import shareicon from "../../../src/assets/icons/share_icon.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import ZamartLoading from "../shared/lotties/zamart-loading";
import CardItemMedium from "../shared/card-item-medium";

const BuySections = ({ data }) => {
  const [lang, setLang] = useLanguage("");

  const history = useHistory();

  const { user } = useAuthState();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [userProfileData, setUserProfileData] = React.useState();
  const [isCopied, setIsCopied] = useState(false);

  const { run: runsendCallRequest, isLoading: isLoadingsendCallRequest } =
    useAxios([]);
  const sendCallRequest = (id) => {
    if (user) {
      runsendCallRequest(
        authAxios
          .post(api.app.sendCallRequest(id))
          .then((res) => {
            toast.success(
              <a className="flex gap-x-5" href={`tel:${res?.data?.data}`}>
                <p>{res?.data?.data}</p>
                <FaPhoneAlt size="19" className="nav-linker" />
              </a>
            );
          })
          .catch((err) => {
            toast.error(err.errors[0].message);
          })
      );
    } else {
      toast.error("You must be logged in to call this user's profile");
      dispatch(On());
    }
  };

  const { run: runUSerProfile, isLoading: isLoadingUserProfile } = useAxios([]);
  const handelOnclickShowDelar = (id) => {
    if (user) {
      if (user?.id === id) {
        history.push(routes.app.myProfile);
      } else {
        runUSerProfile(
          authAxios
            .get(api.app.getUserProfile(id))
            .then((res) => {
              setUserProfileData(res?.data?.data);
            })
            .catch((err) => {
              console.log(err);
            })
        );
        setOpen(true);
      }
    } else {
      toast.error("You must be logged in to view this user's profile");
      dispatch(On());
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + ".....";
    } else {
      return str;
    }
  };

  return (
    <div className=" mt-12 mr-auto ml-20 w-[350px] ">
      <div className="">
        <button
          onClick={() => history.push(routes.app.home)}
          className="text-white border-white border-2 rounded-full flex w-[245px] h-[36px]"
        >
          <MdKeyboardArrowLeft size={32} className="mx-2" />
          <p className="my-auto">BACK TO CATEGORY</p>
        </button>
        <h1 className="text-5xl text-white mt-16">{data?.data?.title}</h1>
        <p className="text-lg text-primary-gray-subMed pt-6">
          {lang === "en"
            ? data?.data?.category?.nameEn
            : data?.data?.category?.nameAn}
        </p>
        <p className="text-xl text-primary-gray mt-6">
          {truncateString(data?.data?.description, 25)}
        </p>
        <div className="flex py-2 mt-14 ">
          <div className="">
            <p className="w-[78px] h-[78px] border-white border-[1px] mx-auto rounded-full  ">
              {/* <img
                  className="w-[114px] h-[112px] rounded-full object-cover p-1  my-auto "
                  src={myProfileImg}
                  alt="myProfileImg"
                /> */}
              <p className="w-[72px] h-[72px] rounded-full mx-auto mt-0.5 pt-5 text-center text-4xl bg-primary-gray-light text-primary-purple ">
                {data?.data?.user?.fullName
                  ?.split(" ")[1]
                  ?.substring(0, 1)
                  .toUpperCase() === undefined
                  ? data?.data?.user?.fullName
                      ?.split(" ")[0]
                      .substring(0, 1)
                      .toUpperCase()
                  : data?.data?.user?.fullName
                      ?.split(" ")[0]
                      ?.substring(0, 1)
                      .toUpperCase() +
                    data?.data?.user?.fullName
                      ?.split(" ")[1]
                      ?.substring(0, 1)
                      .toUpperCase()}
              </p>
            </p>
          </div>
          <div className="mx-4 my-auto">
            <p className=" text-white pb-1 text-lg font-medium ">
              {data?.data?.user?.fullName}
            </p>
            <p
              onClick={() => handelOnclickShowDelar(data?.data?.user?._id)}
              className="text-xs text-primary-cyan-light cursor-pointer"
            >
              ABOUT THIS DEALER
            </p>
          </div>
        </div>
        <p className="text-6xl text-white mt-9">{data?.data?.price}</p>
        <Button
          loading={isLoadingsendCallRequest}
          onClick={() => sendCallRequest(data?.data?._id)}
          className="rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink w-[232px] h-[53px] mt-32 text-lg text-white  mb-8"
        >
          CALL NOW
        </Button>
      </div>
      <Modal
        className="w-[617px] bg-black"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Dimmer
          className=" animate-pulse bg-primary-black-light"
          active={isLoadingUserProfile}
        >
          {/* <Loader active /> */}
          <ZamartLoading />
        </Dimmer>
        <div className="w-[617px] bg-black text-white">
          <div className="relative">
            <img src={profileBG} alt="profileBG" />
            <p className="w-[173px] h-[173px] rounded-full mx-auto mt-0.5 pt-16 text-center text-7xl bg-primary-gray-light text-primary-purple absolute top-1/3 left-[220px] ">
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
          </div>
          <h1 className="text-white text-center text-4xl mt-32 ">
            {userProfileData?.fullName}
          </h1>
          <p className="text-primary-gray-dark text-2xl text-center pt-3">
            {userProfileData?.email}
          </p>
          <div className="flex justify-center gap-x-5 mt-5">
            <p>
              <p className="text-xl uppercase  ">total Calls</p>
              <p className="text-center text-xl pt-1 text-primary-gray-light">
                {userProfileData?.mostViewedItem?.totalCalls}
              </p>
            </p>
            <p>
              <p className="text-xl uppercase  ">total Enquires</p>
              <p className="text-center text-xl pt-1 text-primary-gray-light">
                {userProfileData?.mostViewedItem?.totalEnquires}
              </p>
            </p>
            <p>
              <p className="text-xl uppercase  ">total Search</p>
              <p className="text-center text-xl pt-1 text-primary-gray-light">
                {userProfileData?.mostViewedItem?.totalSearch}
              </p>
            </p>
            <p>
              <p className="text-xl uppercase  ">total Views</p>
              <p className="text-center text-xl pt-1 text-primary-gray-light">
                {userProfileData?.mostViewedItem?.totalViews}
              </p>
            </p>
          </div>
          <div className="flex justify-center gap-x-12 mt-12 mb-8">
            <CopyToClipboard
              text={userProfileData?.email}
              onCopy={() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
                toast.success("Email copy success ");
              }}
            >
              <button className="btn flex justify-center">
                {<img src={copyicon} alt="copyicon" />}
              </button>
            </CopyToClipboard>
            <button>
              <a
                href={`mailto:${userProfileData?.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={shareicon} alt="shareicon" />
              </a>
            </button>
          </div>
          <div className="w-fit mx-auto ">
            <CardItemMedium
              id={userProfileData?.mostViewedItem?._id}
              itemImge={userProfileData?.mostViewedItem?.image || ""}
              adsName={userProfileData?.mostViewedItem?.brand || ""}
              price={userProfileData?.mostViewedItem?.price || ""}
              date={
                new Date(
                  userProfileData?.mostViewedItem?.updatedAt
                ).toLocaleDateString("en-GB") || ""
              }
              itemName={userProfileData?.mostViewedItem?.title || ""}
              userName={userProfileData?.mostViewedItem?.user?.fullName || ""}
              KM={userProfileData?.mostViewedItem?.kiloMeters || ""}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuySections;
