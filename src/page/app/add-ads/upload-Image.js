import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import imgIcon from "../../../../src/assets/icons/img_icon.svg";
import api from "../../../api";
import { BreadCrumbAddAds } from "../../../components/shared/Breadcrumb/bread-crumb-add-ads";
import { authAxios } from "../../../config/axios-config";
import useAxios from "../../../hooks/use-axios";
import useLocalStorage from "../../../hooks/use-localstorage";
import routes from "../../../routes";
import { resizeFile } from "../../../utils/resizeImageFn";
import { On } from "../../../redux/sidebare-slice.js";
import { FaLongArrowAltRight } from "react-icons/fa";

const fileTypes = ["JPEG", "PNG", "GIF"];

const UploadImage = () => {
  const history = useHistory();
  const [CatID, setCatID] = useLocalStorage("category_id", "");
  const [subCatID, setCubCatID] = useLocalStorage("subCategory_Id", "");
  const [comCatID, setComCatID] = useLocalStorage("complment_Id", "");

  console.log("====================================");
  console.log(CatID);
  console.log(subCatID);
  console.log(comCatID);
  console.log("====================================");

  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [fileThree, setFileThree] = useState(null);
  const [fileFour, setFileFour] = useState(null);

  const handleChangeOne = (fileOne) => {
    setFileOne(fileOne);
  };
  const handleChangeTwo = (fileTwo) => {
    setFileTwo(fileTwo);
  };
  const handleChangeThree = (fileThree) => {
    setFileThree(fileThree);
  };
  const handleChangeFour = (fileFour) => {
    setFileFour(fileFour);
  };

  const ads = useSelector((state) => state.addAds.addAds);
  const dispatch = useDispatch();

  const { run: runPostads, isLoading: isLoadingPostads } = useAxios([]);
  const postads = (status) => {
    const formData = new FormData();
    const test = ads[0];
    console.log("====================================");
    console.log(test);
    console.log("====================================");
    if (test === undefined) {
      history.push(routes.app.ceratitems.selectCategory);
    } else
      Object?.keys(test)?.forEach((key) => {
        formData?.append(`${key}`, test[key]);
      });
    formData.append("category", CatID);
    formData.append("complementaryCategory", comCatID);
    formData.append("subCategory", subCatID);
    formData.append("images", fileOne);
    formData.append("images", fileTwo);
    formData.append("images", fileThree);
    formData.append("images", fileFour);
    formData.append("status", status);
    runPostads(
      authAxios
        .post(api.app.createItemUser, formData)
        .then((res) => {
          if (ads[0].length) {
            history.push(routes.app.ceratitems.selectCategory);
          } else if (status === "PENDING") {
            toast.success(
              "The ad has been added successfully and is still under review by  ZAMART admin"
            );
            history.push(routes.app.myProfile);
          } else
            toast.success(
              " The ad has been added successfully and is now being drafted "
            );
          history.push(routes.app.myProfile);
        })
        .catch((err) => {
          if (err?.response?.data?.errors[0]?.message === "Forbidden Access") {
            dispatch(On());
            toast.error(
              "There is an error, you must be logged in in order for the ad to be placed"
            );
          } else toast.error(err.errors[0].message);
        })
    );
  };

  return (
    <div className="text-white max-w-[1500px] mx-auto  animate-in relative pb-8">
      <div className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12">
        <BreadCrumbAddAds />
      </div>
      <div className=" md:grid grid-cols-3 flex flex-wrap">
        <div className="w-full"></div>
        <h1 className="text-center text-6xl pt-12  animate-in mx-auto mb-4 w-full">
          You’re almost there!
          <p className="text-primary-gray text-2xl pt-6">
            Include as much details and pictures as possible, <br></br>and set
            the right price!
          </p>
        </h1>
        <div
          className={` flex justify-center mx-auto  animate-in ${
            fileFour && "hidden"
          } `}
        >
          <div className="my-auto  w-full">
            <div>
              <div className={fileOne && "hidden"}>
                <div className="cursor-pointer">
                  <FileUploader
                    handleChange={handleChangeOne}
                    name="file"
                    types={fileTypes}
                  >
                    <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8  cursor-pointer ">
                      <img className="my-auto" src={imgIcon} alt="imgIcon" />
                      <p className="my-auto">
                        <h1 className="text-2xl">UPLOAD</h1>
                        <p>YOUR PHOTO</p>
                      </p>
                    </div>
                  </FileUploader>
                </div>
              </div>
              <div
                className={`${fileOne ? "" : "hidden"} ${fileTwo && "hidden"}`}
              >
                <div className="cursor-pointer">
                  <FileUploader
                    handleChange={handleChangeTwo}
                    name="file"
                    types={fileTypes}
                  >
                    <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 cursor-pointer ">
                      <img className="my-auto" src={imgIcon} alt="imgIcon" />
                      <p className="my-auto">
                        <h1 className="text-2xl">UPLOAD</h1>
                        <p>YOUR PHOTO</p>
                      </p>
                    </div>
                  </FileUploader>
                </div>
              </div>
              <div
                className={`${fileTwo ? "" : "hidden"} ${
                  fileThree && "hidden"
                }`}
              >
                <div className="cursor-pointer">
                  <FileUploader
                    className="hidden"
                    handleChange={handleChangeThree}
                    name="file"
                    types={fileTypes}
                  >
                    <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 cursor-pointer ">
                      <img className="my-auto" src={imgIcon} alt="imgIcon" />
                      <p className="my-auto">
                        <h1 className="text-2xl">UPLOAD</h1>
                        <p>YOUR PHOTO</p>
                      </p>
                    </div>
                  </FileUploader>
                </div>
              </div>
              <div className={fileThree ? "" : "hidden"}>
                <div className="cursor-pointer">
                  <FileUploader
                    className="hidden"
                    handleChange={handleChangeFour}
                    name="file"
                    types={fileTypes}
                  >
                    <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 cursor-pointer ">
                      <img className="my-auto" src={imgIcon} alt="imgIcon" />
                      <p className="my-auto">
                        <h1 className="text-2xl">UPLOAD</h1>
                        <p>YOUR PHOTO</p>
                      </p>
                    </div>
                  </FileUploader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center animate-in">
        <div className="flex">
          <div>
            {fileOne ? (
              <div>
                <FileUploader handleChange={handleChangeOne} name="file">
                  <img
                    className="w-[404px] h-[393px] object-cover mt-14 mx-auto"
                    src={URL?.createObjectURL(fileOne)}
                    alt="img two"
                  />
                </FileUploader>
              </div>
            ) : (
              <div className="w-[404px] h-[393px] bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white mt-14"></div>
            )}
          </div>
          <div className="mt-14 mx-5">
            {fileTwo ? (
              <div>
                <FileUploader handleChange={handleChangeTwo} name="file">
                  <img
                    className="w-[157px] h-[121px] object-cover  mx-auto"
                    src={URL?.createObjectURL(fileTwo)}
                    alt="img two"
                  />
                </FileUploader>
              </div>
            ) : (
              <div className="w-[157px] h-[121px] bg-primary-gray-med "></div>
            )}
            {fileThree ? (
              <div>
                <FileUploader handleChange={handleChangeThree} name="file">
                  <img
                    className="w-[157px] h-[121px] object-cover my-[14px] "
                    src={URL?.createObjectURL(fileThree)}
                    alt="img two"
                  />
                </FileUploader>
              </div>
            ) : (
              <div className="w-[157px] h-[121px]  bg-primary-gray-med my-[14px]  "></div>
            )}
            {fileFour ? (
              <div>
                <FileUploader handleChange={handleChangeFour} name="file">
                  <img
                    className="w-[157px] h-[121px] object-cover "
                    src={URL?.createObjectURL(fileFour)}
                    alt="img two"
                  />
                </FileUploader>
              </div>
            ) : (
              <div className="w-[157px] h-[121px] bg-primary-gray-med "></div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-x-32 my-12">
        <Button
          loading={isLoadingPostads}
          onClick={() => postads("DRAFTED")}
          className={
            "md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
          }
        >
          <div className="flex justify-between px-1 gap-x-2">
            <p className="text-white text-xl md:pt-1 pt-0 w-full text-end">
              POST AS A DRAFT
            </p>
            <p className="text-white flex justify-end my-auto md:px-14 px-12">
              <FaLongArrowAltRight size={25} />
            </p>
          </div>
        </Button>
        <Button
          loading={isLoadingPostads}
          onClick={() => postads("PENDING")}
          className={
            "md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
          }
        >
          <div className="flex justify-between px-1 gap-x-2">
            <p className="text-white text-xl md:pt-1 pt-0 w-full text-end">
              POST
            </p>
            <p className="text-white flex justify-end my-auto md:px-24 px-20">
              <FaLongArrowAltRight size={25} />
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
