import { useState, useRef } from "react";

const ImgSlider = ({ images }) => {
  const images2 = images?.map((e) => e.img);

  const [img, setImg] = useState(images2 && images2[0]);

  const onClickHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (const j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="relative">
      <div className="">
        <div className="flex left-16 absolute bottom-10   z-30">
          {images2?.map((image, i) => (
            <div
              className={
                i === 0
                  ? "md:w-[157px] w-auto h-[121px] cursor-pointer "
                  : "md:w-[157px] w-auto h-[121px] mx-3 object-cover cursor-pointer"
              }
              key={i}
              onClick={() => onClickHandler(image, i)}
              ref={addRefs}
            >
              <img
                className="w-[157px] h-[121px] object-cover"
                src={`data:image/jpeg;base64,${image}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="w-[830px] h-[780px] object-cover bg-gradient-to-t from-primary-black/90  relative  ">
          {img ? (
            <img
              className="absolute -z-10 w-[830px] h-[780px] object-cover "
              src={`data:image/jpeg;base64,${img}`}
              alt=""
            />
          ) : (
            <img
              className="absolute -z-10 w-[830px] h-[780px] object-cover"
              src={`data:image/jpeg;base64,${images2 && images2[0]}`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImgSlider;
