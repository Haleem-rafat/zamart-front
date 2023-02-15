import React from "react";
import googlePlay from "../../../src/assets/icons/google_play_icon.svg";
import appStore from "../../../src/assets/icons/app_store_icon.svg";
import ZAMARTfooter from "../../../src/assets/logo/ZAMART_footer.svg";

const Footer = () => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-4 text-white text-2xl py-9 pl-36 ">
          <p>Bikes for sale</p>
          <p>News & Reviews</p>
          <p>General Help</p>
          <p>Our App</p>
        </div>
        <div className="grid grid-cols-4 bg-black  text-white py-12 pl-36">
          <div>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Used bikes for sale</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">New bikes for sale</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">BikeFacts History Reports</span>
            </li>
          </div>
          <div>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Bike News</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Bike Reviews</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Bike Advice</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Bike Videos</span>
            </li>
          </div>
          <div>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Terms & Conditions</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Privacy</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">Contact Us</span>
            </li>
            <li className="text-primary-cyan-light py-1.5 cursor-pointer">
              <span className="text-white">About Us</span>
            </li>
          </div>
          <div>
            <p className="text-2xl">Download Our App Now</p>
            <p className="text-2xl pt-1">On App Store / Google Play</p>
            <div className="flex gap-x-5 pt-5">
              <img
                className="w-40 h-16 cursor-pointer"
                src={googlePlay}
                alt="googlePlay"
              />
              <img
                className="w-40 h-16 cursor-pointer"
                src={appStore}
                alt="app store"
              />
            </div>
          </div>
        </div>
        <div className="h-14 flex justify-center ">
          <img className="w-44" src={ZAMARTfooter} alt="ZAMARTfooter" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
