import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Dimmer, Loader } from "semantic-ui-react";
import ButtonCategory from "../components/ads-componets/button-category";
import { FiHome } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import AdsSescrisption from "../components/ads-componets/ads-descrisption";
import useAxios from "../hooks/use-axios";
import { authAxios, axios } from "../config/axios-config";
import api from "../api";
import { useLanguage } from "../context/language-context";
import { useQuery } from "../hooks/use-query";
import { toast } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { On } from "../redux/sidebare-slice.js";
import { useDispatch } from "react-redux";

import imgIcon from "../../src/assets/icons/img_icon.svg";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const fileTypes = ["JPEG", "PNG", "GIF"];

const AddAds = () => {
  const [steper, setSetper] = useState(1);
  const [categories, setCategories] = useState();
  const [SubCategories, setSubCategories] = useState();
  const [adsDescrisption, setAdsDescrisption] = useState();

  console.log(categories);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const [lang] = useLanguage("");

  const query = useQuery();
  const categoriesValdation = query.get("categories");
  const subCategoriesValdation = query.get("subCategories");

  const { run, isLoading } = useAxios([]);
  const { run: rungetSubCategories, isLoading: isLoadinggetSubCategories } =
    useAxios([]);
  useEffect(() => {
    run(
      axios.get(api.app.viewCategories).then((res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        setCategories(res?.data?.data);
      })
    );
  }, [run]);

  useEffect(() => {
    if (categoriesValdation)
      rungetSubCategories(
        axios
          .get(api.app.viewSubCategories(categoriesValdation))
          .then((res) => {
            setSubCategories(res?.data?.data);
          })
      );
  }, [categoriesValdation, run, rungetSubCategories]);

  const { run: runPostads, isLoading: isLoadingPostads } = useAxios([]);
  const postads = (status) => {
    const formData = new FormData();
    formData.append("title", adsDescrisption?.titel);
    formData.append("price", adsDescrisption?.price);
    formData.append("description", adsDescrisption?.descrisption);
    formData.append("usage", adsDescrisption?.usage);
    formData.append("kiloMeters", adsDescrisption?.kilometers);
    formData.append("year", adsDescrisption?.year);
    formData.append("warranty", adsDescrisption?.warranty);
    formData.append("finalDriveSystem", adsDescrisption?.finalDriveSystem);
    formData.append("wheels", adsDescrisption?.wheels);
    formData.append("brand", adsDescrisption?.brand);
    formData.append("model", adsDescrisption?.model);
    formData.append("city", adsDescrisption?.citie);
    formData.append("category", categoriesValdation);
    formData.append("subCategory", subCategoriesValdation);
    formData.append("images", fileOne);
    formData.append("images", fileTwo);
    formData.append("images", fileThree);
    formData.append("images", fileFour);
    formData.append("status", status);
    runPostads(
      authAxios
        .post(api.app.createItemUser, formData)
        .then((res) => {
          history.push(routes.app.home);
          if (status === "PENDING") {
            toast.success(
              "The ad has been added successfully and is still under review by  ZAMART admin"
            );
          } else
            toast.success(
              " The ad has been added successfully and is now being drafted "
            );
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

  const sectionsOne = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={15} className="text-primary-gray-dark mt-1" />
        </>
      ),
    },
    { key: "Category", content: "category", active: true },
  ];
  const sectionsTwo = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={15} className="text-primary-gray-dark mt-1" />
        </>
      ),
    },
    { key: "Category1", content: "category", active: false },
    { key: "Category2", content: "category", active: true },
  ];

  return (
    <div className=" text-white max-w-[1500px] mx-auto animate-in  pb-8">
      <Dimmer className=" animate-pulse" active={isLoading}>
        <Loader active />
      </Dimmer>
      {steper === 1 ? (
        <Breadcrumb
          className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12"
          icon="right angle"
          sections={sectionsOne}
        />
      ) : (
        <Breadcrumb
          className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12"
          icon="right angle"
          sections={sectionsTwo}
        />
      )}
      {steper > 2 ? (
        <div className=" md:grid grid-cols-3 flex flex-wrap">
          <div></div>
          <h1 className="text-center text-6xl pt-12  animate-in mx-auto mb-4">
            You’re almost there!
            <p className="text-primary-gray text-2xl pt-6">
              Include as much details and pictures as possible, <br></br>and set
              the right price!
            </p>
          </h1>
          <div
            className={`${
              steper === 4 ? "animate-in" : "animate-out hidden"
            } flex justify-center mx-auto  ${fileFour && "hidden"} `}
          >
            <div className="my-auto ">
              <div>
                <div className={fileOne && "hidden"}>
                  <div className="cursor-pointer">
                    <FileUploader
                      handleChange={handleChangeOne}
                      name="file"
                      types={fileTypes}
                    >
                      <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8  ">
                        <img className="my-auto" src={imgIcon} alt="imgIcon" />
                        <p>
                          <h1 className="text-2xl">UPLOAD</h1>
                          <p>YOUR PHOTO</p>
                        </p>
                      </div>
                    </FileUploader>
                  </div>
                </div>
                <div
                  className={`${fileOne ? "" : "hidden"} ${
                    fileTwo && "hidden"
                  }`}
                >
                  <div className="cursor-pointer">
                    <FileUploader
                      handleChange={handleChangeTwo}
                      name="file"
                      types={fileTypes}
                    >
                      <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 ">
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
                      <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 ">
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
                      <div className="bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple text-white w-72 h-20 flex justify-between px-8 ">
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
      ) : (
        <h1 className="text-center text-6xl pt-12  animate-in">
          Now choose the right category<br></br> for your ad:
          <p className="text-primary-gray text-2xl pt-6">
            Consultant Psychiatrist - Experience In Adult Psychiatry <br></br>
            And Addiction Medicine I Treat Many
          </p>
        </h1>
      )}
      <div
        className={`${
          steper === 1 ? "animate-in" : "animate-out hidden "
        } grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-20 mx-4 relative `}
      >
        {categories?.map((e) => (
          <ButtonCategory
            id={e?._id}
            category={"Category"}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
            isBig={true}
          />
        ))}
      </div>
      <div
        className={`${
          steper === 2 ? "animate-in" : "animate-out hidden"
        } grid md:grid-cols-3 grid-cols-1 gap-14 mt-20 mx-4 `}
      >
        {SubCategories?.map((e) => (
          <ButtonCategory
            id={e?._id}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
          />
        ))}
      </div>
      <div
        className={`${
          steper === 3 ? "animate-in" : "animate-out hidden"
        } items-center mx-4`}
      >
        <AdsSescrisption
          setAdsDescrisption={setAdsDescrisption}
          setSetper={setSetper}
        />
      </div>

      <div
        className={`${
          steper === 4 ? "animate-in" : "animate-out hidden"
        } flex justify-center`}
      >
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

      <div className=" mt-20 mb-44 mx-4">
        {steper === 4 ? (
          <div className="flex flex-col md:flex-row justify-center gap-x-32">
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
        ) : (
          <div className="flex justify-center mt-20 mb-44 mx-4">
            <button
              onClick={
                steper === 1
                  ? categoriesValdation
                    ? () => setSetper(steper + 1)
                    : ""
                  : subCategoriesValdation
                  ? () => setSetper(steper + 1)
                  : ""
              }
              className={
                steper === 3
                  ? "hidden"
                  : "md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
              }
            >
              <div className="flex justify-between px-1 gap-x-2">
                <p className="text-white text-xl md:pt-1 pt-0 w-full text-end">
                  Next
                </p>
                <p className="text-white flex justify-end my-auto md:px-24 px-20">
                  <FaLongArrowAltRight size={25} />
                </p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAds;
