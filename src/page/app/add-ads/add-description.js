import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Dimmer, Dropdown, Form, Loader } from "semantic-ui-react";
import api from "../../../api";
import { BreadCrumbAddAds } from "../../../components/shared/Breadcrumb/bread-crumb-add-ads";
import FormikMultiDropdown from "../../../components/shared/formik/formik-dropdown";
import FormikInput from "../../../components/shared/formik/formik-input";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import useLocalStorage from "../../../hooks/use-localstorage";
import * as Yup from "yup";
import FormikTextarea from "../../../components/shared/formik/formik-textarea";
import { useDispatch, useSelector } from "react-redux";
import { addAds } from "../../../redux/add-ads-slice";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import useGetBrand from "../../../hooks/use-get-brand";
import useGetModel from "../../../hooks/use-get-model";
import useGetCities from "../../../hooks/use-get-cities";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";

const AddDescription = () => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  const history = useHistory();

  const [categoriesFromData, setCategoriesFromData] = useState("");
  const [addBrand, setAddBrand] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [brandId, setBrandId] = useState();

  const [brandVal, setBrandVal] = useState();
  const [modelVal, setModleVal] = useState();

  const [CatID, setCatID] = useLocalStorage("category_id", "");
  const { citiesOptions, loadingcitiesOptions } = useGetCities();

  const dispatch = useDispatch();

  const usageOptions = [
    {
      key: "used",
      text: selectedContent[localizationKeys.Used],
      value: "used",
    },
    {
      key: "new",
      text: selectedContent[localizationKeys.New],
      value: "new",
    },
  ];

  const adsDescrisption = (values) => {
    dispatch(addAds({ ...values, model: modelVal, brand: brandVal }));
    history.push(routes.app.ceratitems.uploadImage);
  };

  const adsDescrisptionSchema = Yup.object({
    title: Yup.string().max(15).required("Required field"),
    price: Yup.string().max(8).required("Required field"),
    description: Yup.string().required("Required field"),
    usage: Yup.string().required("Required field"),
    year: Yup.string().required("Required field"),
    city: Yup.string().required("Required field"),
  });

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    if (CatID)
      run(
        axios.get(api.app.ViewCategoriesFromData(CatID)).then((res) => {
          setCategoriesFromData(res?.data?.data);
        })
      );
  }, [CatID, run]);

  const { BrandOptions, loadingBrand } = useGetBrand({
    CatID,
  });

  const handelAddbrand = () => {
    setAddBrand(!addBrand);
  };

  const { ModelOptions, loadingModel } = useGetModel({
    brandId,
  });

  const handelAddModel = () => {
    setAddModel(!addModel);
  };

  return (
    <div className="text-white max-w-[1500px] mx-auto  animate-in relative pb-8">
      <Dimmer
        className=" animate-pulse bg-primary-black-light"
        active={isLoading}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      <div className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12">
        <BreadCrumbAddAds />
      </div>
      <h1 className="text-center text-6xl pt-12  animate-in mx-auto mb-4 font-serifCUS ">
        {selectedContent[localizationKeys.Yourealmostthere]}
        <p className="text-primary-gray text-2xl pt-6">
          {
            selectedContent[
              localizationKeys.Includeasmuchdetailsandpicturesaspossible
            ]
          }
          <br></br> {selectedContent[localizationKeys.andsettherightprice]}
        </p>
      </h1>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          usage: "",
          year: "",
          city: "",
        }}
        onSubmit={adsDescrisption}
        validationSchema={adsDescrisptionSchema}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="max-w-2xl sm:mx-auto mx-4">
              <div className="w-full mt-10">
                <FormikInput
                  name="title"
                  type="text"
                  placeholder={selectedContent[localizationKeys.title]}
                />
              </div>
              <div className={addBrand ? "w-full mt-10 " : "hidden h-0 "}>
                <Form.Input
                  className="bg-white p-3 rounded-full  "
                  type="text"
                  placeholder={selectedContent[localizationKeys.brand]}
                  onChange={(e, { value }) => {
                    setBrandVal(value);
                  }}
                />
              </div>
              <div
                className={
                  addBrand ? "hidden " : " mt-10 flex gap-x-3 justify-between "
                }
              >
                <div className="w-full mt-3 ">
                  <Form.Dropdown
                    className="bg-white p-3 rounded-full edit_TES  "
                    placeholder={selectedContent[localizationKeys.brand]}
                    selection
                    clearable
                    compact
                    search
                    required
                    loading={loadingBrand}
                    options={BrandOptions}
                    onChange={(e, { value }) => {
                      setBrandId(value);
                      setBrandVal(e.target.textContent);
                    }}
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-primary-cyan to-primary-pink rounded-full w-40 h-16 mt-3"
                  onClick={() => handelAddbrand()}
                >
                  {selectedContent[localizationKeys.AddBrand]}
                </button>
              </div>
              <div className={addModel ? "w-full mt-10 " : "hidden h-0 "}>
                <Form.Input
                  className="bg-white p-3 rounded-full "
                  type="text"
                  placeholder={selectedContent[localizationKeys.model]}
                  onChange={(e, { value }) => {
                    setModleVal(value);
                  }}
                />
              </div>
              <div
                className={
                  addModel ? "hidden " : " mt-10 flex gap-x-3 justify-between "
                }
              >
                <div className="w-full mt-3 ">
                  <Form.Dropdown
                    className="bg-white p-3 rounded-full edit_TES  "
                    placeholder={selectedContent[localizationKeys.model]}
                    selection
                    clearable
                    compact
                    search
                    required
                    loading={loadingModel}
                    options={ModelOptions}
                    onChange={(e, { value }) => {
                      setModleVal(e.target.textContent);
                    }}
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-primary-cyan to-primary-pink rounded-full w-40 h-16 mt-3"
                  onClick={() => handelAddModel()}
                >
                  {selectedContent[localizationKeys.AddModel]}
                </button>
              </div>
              <div className="w-full mt-10">
                <FormikInput
                  name="price"
                  type="number"
                  placeholder={selectedContent[localizationKeys.price]}
                />
              </div>
              <div className="w-full mt-6">
                <FormikTextarea
                  name="description"
                  placeholder={
                    selectedContent[localizationKeys.DESCRIPTIONYOURAD]
                  }
                />
              </div>
              <div className="w-full mt-10">
                <FormikInput
                  name="year"
                  type="number"
                  placeholder={selectedContent[localizationKeys.year]}
                />
              </div>
              <div className="w-full mt-10">
                <FormikMultiDropdown
                  name="usage"
                  placeholder={selectedContent[localizationKeys.usage]}
                  options={usageOptions}
                />
              </div>
              {categoriesFromData &&
                categoriesFromData?.map((e) => (
                  <div className="w-full mt-10 text-black">
                    <FormikInput
                      name={e?.key}
                      type={e?.type}
                      placeholder={lang === "en" ? e?.labelEn : e?.labelAr}
                    />
                  </div>
                ))}
              <div className="w-full mt-10">
                <FormikMultiDropdown
                  name="city"
                  placeholder={"city"}
                  options={citiesOptions}
                  loading={loadingcitiesOptions}
                />
              </div>
            </div>
            <div className="flex justify-center mt-20 mb-44 mx-4">
              <button
                className={
                  "md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
                }
              >
                <div className="flex justify-between px-1 gap-x-2">
                  <p className="text-white text-xl md:pt-1 pt-0 w-full text-end">
                    {selectedContent[localizationKeys.next]}
                  </p>
                  <p className="text-white flex justify-end my-auto md:px-24 px-20 rtl:rotate-180">
                    <FaLongArrowAltRight size={25} />
                  </p>
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDescription;
