import React from "react";

import aboutus from "../../../../src/assets/img/about-us.png";
const AboutUs = () => {
  return (
    <div className="md:flex grid grid-cols-1 justify-between  my-5 animate-in">
      <div className="sm:mx-40 mx-8 sm:mt-40 mt-8 mb-8">
        <p className="text-primary-gray text-xl font-normal">OUR STORY</p>
        <h1 className=" text-white text-7xl pt-2 pb-12">ABOUT US</h1>
        <p className="text-primary-gray text-xl font-normal">
          it is a long established fact that a reader will be distracted by the
          readable content<br></br> of a page when looking at its layout. the
          point of using lorem ipsum is that it has a<br></br> more-or-less
          normal <br></br>it is a long established fact that a reader will be
          distracted by the readable content <br></br>of a page when looking at
          its layout. the point of using lorem ipsum is that it has a<br></br>
          more-or-less normal
        </p>
        <p className="text-primary-gray text-xl font-normal py-12">
          it is a long established fact that a reader will be distracted by the
          readable content<br></br> of a page when looking at its layout. the
          point of using lorem ipsum is that it has<br></br> a more-or-less
          normal
          <br></br>
        </p>
        <p className="text-primary-gray text-xl font-normal">
          it is a long established fact that a reader will be distracted by the
          readable content
        </p>
      </div>
      <div>
        <img
          className="w-full h-full object-cover"
          src={aboutus}
          alt="aboutus"
        />
      </div>
    </div>
  );
};

export default AboutUs;
