import React from "react";
import { toast, ToastBar } from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import api from "../../api";
import { authAxios } from "../../config/axios-config";
import { useAuthState } from "../../context/auth-context";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";
import routes from "../../routes";
import { On } from "../../redux/sidebare-slice.js";

const BuySections = ({ data }) => {
  const [lang, setLang] = useLanguage("");

  const history = useHistory();

  const { user } = useAuthState();
  const dispatch = useDispatch();

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

  const handelOnclickShowDelar = (id) => {
    if (user) {
      if (user?.id === id) {
        history.push(routes.app.myProfile);
      } else history.push(routes.app.userProfile(id));
    } else {
      toast.error("You must be logged in to view this user's profile");
      dispatch(On());
    }
  };

  return (
    <div className=" mt-12 mr-auto ml-20 ">
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
          {data?.data?.description || "unkown"}
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
        <p className="text-6xl text-white mt-9">{data?.data?.price}$</p>
        <Button
          loading={isLoadingsendCallRequest}
          onClick={() => sendCallRequest(data?.data?.user?._id)}
          className="rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink w-[232px] h-[53px] mt-36 text-lg text-white "
        >
          CALL NOW
        </Button>
      </div>
    </div>
  );
};

export default BuySections;
