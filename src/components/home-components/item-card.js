import React, { useState } from "react";
import speedometer from "../../../src/assets/icons/speedometer.svg";

const ItemCard = ({
  itemImge,
  itemName,
  price,
  date,
  adsName,
  userName,
  KM,
  isSmall,
}) => {
  const [mouseMove, setMouseMove] = useState(false);
  const [mouseMovedelay, setMouseMovedelay] = useState(false);

  setTimeout(() => {
    if (mouseMove) {
      setMouseMovedelay(true);
    } else {
      setMouseMovedelay(false);
    }
  }, "250");

  return (
    <div className="mx-auto">
      <div className="relative w-full h-auto mb-8 overflow-hidden">
        <div className="">
          <div
            className={`${
              isSmall && " h-[418px] overflow-hidden"
            } w-full  h-[534px] flex items-end absolute  z-20 bg-gradient-to-t from-black text-white `}
          >
            <div className="w-full">
              <div
                className={
                  mouseMovedelay
                    ? "animate-out flex justify-between text-3xl pb-10 px-6"
                    : "animate-in flex justify-between text-3xl pb-10 px-6"
                }
              >
                <p>{itemName}</p>
                <p className="border-r-[1px] blur-[1px]"></p>
                <p>{price} $</p>
              </div>
              <button
                onMouseEnter={() => setMouseMove(true)}
                onMouseLeave={() => setMouseMove(false)}
                className="bg-gradient-to-r from-primary-pink to-primary-cyan w-full h-[66px] text-white delay-300 duration-300 hover:delay-300 hover:duration-300 hover:h-[200px]"
              >
                <div
                  className={`${
                    mouseMovedelay ? "animate-in" : "animate-out hidden"
                  } h-[200px] delay-300 `}
                >
                  <div className="text-start  px-2 ">
                    <p className="text-base font-normal py-5 px-8">
                      SUBMIT {date} . {userName}
                    </p>
                    <p className="text-2xl border-b-[1px] border-white  pb-5 px-8">
                      {adsName}
                    </p>
                  </div>
                  <div
                    className={
                      isSmall
                        ? "flex justify-center mt-8 px-10 "
                        : "flex justify-between mt-6 px-10"
                    }
                  >
                    <button
                      className={`${
                        isSmall && "hidden"
                      } w-[174px] h-[54px] rounded bg-white text-black `}
                    >
                      <div className="flex gap-x-2 justify-center ">
                        <p className="font-thin pt-1">BUY</p>
                        <p className="text-lg ">${price}</p>
                      </div>
                    </button>
                    <div className="flex gap-x-4 my-auto">
                      <img
                        className="w-8 h-7"
                        src={speedometer}
                        alt="speedometer"
                      />
                      <p className="pt-1">{KM},00 KM</p>
                    </div>
                  </div>
                </div>
                <p className={mouseMovedelay ? "animate-out" : "animate-in"}>
                  LEARN MORE
                </p>
              </button>
            </div>
          </div>
          <img
            className={`${
              isSmall ? "w-[307px] h-[418px] " : "w-[400px] h-[534px] "
            } object-cover `}
            src={`data:image/jpeg;base64,${itemImge}`}
            alt="imgTest "
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
