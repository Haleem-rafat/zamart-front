import React, { useState } from "react";

import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import ZAMARTname from "../../../src/assets/logo/ZAMART_name.svg";
import plusIcon from "../../../src/assets/icons/plus-icon.svg";
import { Dropdown, Icon } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { On } from "../../redux/sidebare-slice.js";

const HeaderHome = () => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="flex justify-between  md:mx-28 mx-2 h-[95px]">
        {/*  ZAMART logo */}
        <div className="flex">
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
            <button className="md:w-56 w-32 md:h-16 h-10 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl md:mt-6 mt-8">
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
              onClick={() => dispatch(On())}
              className="md:mt-6 mt-9 ml-12 cursor-pointer"
            >
              <p className="text-primary-cyan-light md:text-sm text-xs font-normal">
                Welcome
              </p>
              <p className="text-white md:text-2xl text-sm font-medium ">
                User Login
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white md:h-[76px] h-[40px]">
        <div className=" flex justify-center text-primary-black-light text-xl">
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-r-2 hidden md:block">
            text one
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2 hidden md:block">
            text two
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2 hidden md:block">
            text three
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2 hidden md:block">
            text four
          </div>
          <div className="w-72 h-[76px] pt-6 hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink hover:shadow-primary-purple hover:text-white text-center cursor-pointer border-x-2 hidden md:block">
            text five
          </div>
          <div className="w-72 md:h-[76px] h-[40px] md:pt-6 pt-3 text-center border-x-2">
            <Dropdown text="All Categories">
              <Dropdown.Menu>
                <Dropdown.Item className="text-xl" text="Categories one" />
                <Dropdown.Item className="text-xl" text="Categories three" />
                <Dropdown.Item className="text-xl" text="Categories four" />
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
