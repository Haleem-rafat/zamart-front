import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import speedometer from "../../../src/assets/icons/speedometer.svg";
import routes from "../../routes";

const ItemCardSmall = ({
  itemImge,
  itemName,
  price,
  date,
  adsName,
  userName,
  KM,
  id,
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

  const history = useHistory();

  return (
    <div className="mx-auto">
      <div className="relative w-full h-auto mb-8 overflow-hidden">
        <div className="">
          <div
            className={
              " h-[417px] overflow-hidden w-full flex items-end absolute  z-20 bg-gradient-to-t from-black text-white "
            }
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
                <p>{price} </p>
              </div>
              <button
                onClick={() => history?.push(routes.app.viewItemById(id))}
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
                  <div className={"flex justify-center mt-8 px-10 "}>
                    <div className="flex gap-x-4 my-auto">
                      <img
                        className="w-8 h-7"
                        src={speedometer}
                        alt="speedometer"
                      />
                      <p className="pt-1">{KM}KM</p>
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
            className="w-[307px] h-[417px] object-cover "
            src={`data:image/jpeg;base64,${itemImge}`}
            alt="imgTest "
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCardSmall;
