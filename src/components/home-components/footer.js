import React from "react";
import googlePlay from "../../../src/assets/icons/google_play_icon.svg";
import appStore from "../../../src/assets/icons/app_store_icon.svg";
import ZAMARTfooter from "../../../src/assets/logo/ZAMART_footer.svg";

const Footer = () => {
  return (
    <div>
      <div>
        <div className="md:grid grid-cols-4 hidden  text-white text-2xl py-9 md:pl-36 pl-12 ">
          <p>Bikes for sale</p>
          <p>News & Reviews</p>
          <p>General Help</p>
          <p>Our App</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black  text-white py-12 md:pl-36 pl-12">
          <p className="md:hidden block text-white text-2xl py-4">
            Bikes for sale
          </p>
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
            <p className="md:hidden block text-white text-2xl py-4">
              News & Reviews
            </p>
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
            <p className="md:hidden block text-white text-2xl py-4">
              General Help
            </p>
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
            <p className="md:hidden block text-white text-2xl py-4">Our App</p>
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
