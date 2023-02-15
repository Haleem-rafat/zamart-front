import React from "react";
import tryAppCar from "../../../src/assets/img/try_app_car.png";
const TryApp = () => {
  return (
    <div>
      <div className="text-white mt-28 ">
        <div className="w-full h-[450px] pl-40 bg-gradient-to-t from-primary-black absolute z-10">
          <p className="text-7xl pt-36">TRY ZAMART APP</p>
          <p className="text-2xl pt-6 ">
            A new experience in the world of second-hand purchase
          </p>
          <button className="w-52 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple drop-shadow-3xl mt-6">
            <div className="flex justify-center gap-x-2">
              <p className="text-white">TAKE A LOOK!</p>
            </div>
          </button>
        </div>
        <img
          className="w-full h-[450px] object-cover relative "
          src={tryAppCar}
          alt="tryAppCar"
        />
      </div>
    </div>
  );
};

export default TryApp;
