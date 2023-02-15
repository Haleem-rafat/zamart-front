import React from "react";
import CategoriesCard from "./categories-card";
import googlePlay from "../../../src/assets/icons/google_play_icon.svg";
import appStore from "../../../src/assets/icons/app_store_icon.svg";

const CategoriesSections = () => {
  return (
    <div className="w-full">
      {/* Categories Sections */}
      <div className="flex flex-col md:flex-row justify-between gap-x-8 gap-y-8 mx-8 my-5">
        <CategoriesCard
          img={
            "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          lable={"BIKERS"}
          info={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
        />
        <CategoriesCard
          img={
            "https://images.pexels.com/photos/358189/pexels-photo-358189.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          lable={"CARS"}
          info={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
        />
        <CategoriesCard
          img={
            "https://c0.wallpaperflare.com/preview/347/166/382/laptop-phone-controller-gaming.jpg"
          }
          lable={"ELECTRONIC"}
          info={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
        />
      </div>
      {/* google play and app store */}
      <div className="flex md:flex-row flex-col justify-between bg-black mx-8 h-44 md:px-24 px-4 ">
        <div className="text-white my-auto ">
          <p className="md:text-5xl text-2xl">Find amazing deals on the go.</p>
          <p className="md:text-xl text-lg md:pt-4 pt-2">
            Download the app now!
          </p>
        </div>
        <div className="flex mx-auto md:mx-0 gap-x-5 md:gap-x-0 my-auto">
          <img
            className="md:w-56 w-40 h-16 cursor-pointer"
            src={googlePlay}
            alt="googlePlay"
          />
          <img
            className="md:w-56 w-40 h-16 cursor-pointer"
            src={appStore}
            alt="app store"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesSections;
