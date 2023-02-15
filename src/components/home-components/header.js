import React, { useState } from "react";

import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import ZAMARTname from "../../../src/assets/logo/ZAMART_name.svg";
import plusIcon from "../../../src/assets/icons/plus-icon.svg";
import { Dropdown, Icon } from "semantic-ui-react";

import useLocalStorage from "../../hooks/use-localstorage";

import { useDispatch } from "react-redux";
import { On } from "../../redux/sidebare-slice.js";

const HeaderHome = () => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="flex justify-between mx-28 h-[95px]">
        {/*  ZAMART logo */}
        <div className="flex">
          <img className="h-[40px] my-8" src={ZAMARTlogo} alt="ZAMARTlogo" />
          <img
            className="h-[26px] mt-11 mx-4"
            src={ZAMARTname}
            alt="ZAMARTname"
          />
        </div>
        {/* button and auth sidare */}
        <div className="flex">
          {/* button */}
          <div>
            <button className="w-56 h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl mt-6">
              <div className="flex justify-center gap-x-2">
                <img src={plusIcon} alt="plusIcon" />
                <p className="text-white">SELL MY BIKE</p>
              </div>
            </button>
          </div>
          {/* auth sidare button */}
          <div>
            <div
              onClick={() => dispatch(On())}
              className="mt-6 ml-12 cursor-pointer"
            >
              <p className="text-primary-cyan-light text-sm font-normal">
                Welcome
              </p>
              <p className="text-white text-2xl font-medium ">User Login</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[64px]">
        <div className=" flex justify-center text-primary-black-light text-xl">
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-r-2">
            text one
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2">
            text two
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2">
            text three
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2">
            text four
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2">
            text five
          </div>
          <div className="w-72 h-[76px] pt-6 text-center border-x-2">
            <Dropdown text="All Categories">
              <Dropdown.Menu>
                <Dropdown.Item className="text-xl" text="Categories one" />
                <Dropdown.Item className="text-xl" text="Categories three" />
                <Dropdown.Item className="text-xl" text="Categories four" />
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className=" w-72 h-[76px] pt-6 text-center border-l-2">
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