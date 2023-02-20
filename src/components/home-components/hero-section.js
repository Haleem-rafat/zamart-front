import React from "react";
import { SlMagnifier } from "react-icons/sl";
import { Dropdown } from "semantic-ui-react";
import homeCarImg from "../../../src/assets/img/home_car_img.png";
const HeroSection = () => {
  return (
    <div>
      <div className="text-white ">
        <div className="w-full h-[720px] bg-gradient-to-r from-primary-black absolute z-10">
          <p className="md:text-7xl text-5xl text-center pt-64">
            TRY ZAMART APP
          </p>
          <p className="md:text-2xl text-xl text-center pt-2 ">
            Buy, sell and find just about anything using the app on your mobile.
          </p>

          <div className="flex justify-center flex-wrap gap-x-2 mt-14">
            <div className="backdrop-blur-xl bg-gradient-to-r from-white/70 bg-white/40 lg:w-[730px] w-full lg:h-[84px] h-full z-10">
              <div className="flex justify-center flex-wrap gap-x-20 pt-7 text-primary-black-light text-2xl  z-20">
                <div>
                  <Dropdown text="Type">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="text-base text-gray-500">Choose Type</p>
                </div>
                <div>
                  <Dropdown text="Make">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="text-base text-gray-500">Choose make</p>
                </div>
                <div>
                  <Dropdown text="Model">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="text-base text-gray-500">Choose year</p>
                </div>
                <div>
                  <Dropdown text="keyword">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="text-base text-gray-500">Ex: KIA 2010</p>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl lg:w-[230px] w-full h-[80px]">
              <div className="flex justify-center gap-x-2">
                <SlMagnifier size={30} />
                <p className="text-2xl">SEARCH NOW</p>
              </div>
            </button>
          </div>
          <div className="flex justify-center flex-wrap">
            <div className="backdrop-blur-md bg-gradient-to-r from-white/80 bg-white/25 lg:w-[967px] w-full lg:h-[30px] h-auto mt-[1px] ">
              <div className="flex gap-x-[80px] mx-[70px] pt-2 text-primary-black-light z-20">
                <div>
                  <Dropdown text="Location">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown text="New & Used">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories one"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories three"
                      />
                      <Dropdown.Item
                        className="text-xl"
                        text="Categories four"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-full h-[720px] relative object-cover "
          src={homeCarImg}
          alt="homeCareImg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
