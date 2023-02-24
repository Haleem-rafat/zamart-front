import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Dimmer, Form, Loader } from "semantic-ui-react";
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

const AddDescription = () => {
  const [lang] = useLanguage("");
  const history = useHistory();

  const [categoriesFromData, setCategoriesFromData] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [addBrand, setAddBrand] = useState(false);
  const [brandId, setBrandID] = useState();
  const [addModel, setAddModel] = useState(false);

  const [CatID, setCatID] = useLocalStorage("category_id", "");

  const dispatch = useDispatch();

  const { run: getCities, isLoading: isGettingCiites } = useAxios({});
  useEffect(() => {
    getCities(axios.get(`${api.cities.default}`)).then(({ data }) => {
      const citiesOptions = data?.data?.map((e) => ({
        key: e?._id,
        value: e?._id,
        text: `${lang === "en" ? e.nameEn : e.nameAr}`,
      }));
      setCitiesOptions(citiesOptions);
    });
  }, [getCities, lang]);

  const usageOptions = [
    {
      key: "USED",
      text: "USED",
      value: "USED",
    },
    {
      key: "NEW",
      text: "NEW",
      value: "NEW",
    },
    {
      key: "OPEN_BOX",
      text: "OPEN BOX",
      value: "OPEN_BOX",
    },
  ];

  const adsDescrisption = (values) => {
    dispatch(addAds(values));
    history.push(routes.app.ceratitems.uploadImage);
  };

  const adsDescrisptionSchema = Yup.object({
    title: Yup.string().max(10).required("Required field"),
    price: Yup.string().max(8).required("Required field"),
    description: Yup.string().required("Required field"),
    usage: Yup.string().required("Required field"),
    year: Yup.string().required("Required field"),
    brand: Yup.string().required("Required field"),
    model: Yup.string().required("Required field"),
    citie: Yup.string().required("Required field"),
  });

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios
        .get(api.app.ViewCategoriesFromData("63f299c76b80690068d00423"))
        .then((res) => {
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
        You’re almost there!
        <p className="text-primary-gray text-2xl pt-6">
          Include as much details and pictures as possible, <br></br>and set the
          right price!
        </p>
      </h1>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          model: "",
          brand: "",
          usage: "",
          year: "",
          citie: "",
        }}
        onSubmit={adsDescrisption}
        validationSchema={adsDescrisptionSchema}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="max-w-2xl sm:mx-auto mx-4">
              <div className="w-full mt-10">
                <FormikInput name="title" type="text" placeholder="TITLE" />
              </div>
              <div className={addBrand ? "w-full mt-10 " : "hidden h-0 "}>
                <FormikInput name="brand" type="text" placeholder="BRAND" />
              </div>
              <div
                className={
                  addBrand ? "hidden " : " mt-10 flex gap-x-3 justify-between "
                }
              >
                <div className="w-full ">
                  <FormikMultiDropdown
                    name="brand"
                    selection
                    placeholder={"BRAND"}
                    options={BrandOptions}
                    loading={loadingBrand}
                    onChange={(e) => setBrandID(e)}
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-primary-cyan to-primary-pink rounded-full w-32 h-16 mt-3"
                  onClick={() => handelAddbrand()}
                >
                  Add Brand
                </button>
              </div>
              <div className={addModel ? "w-full mt-10 " : "hidden h-0 "}>
                <FormikInput name="model" type="text" placeholder="MODEL" />
              </div>
              <div
                className={
                  addModel ? "hidden " : " mt-10 flex gap-x-3 justify-between "
                }
              >
                <div className="w-full ">
                  <FormikMultiDropdown
                    name="model"
                    selection
                    placeholder={"MODEL"}
                    options={ModelOptions}
                    loading={loadingModel}
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-primary-cyan to-primary-pink rounded-full w-32 h-16 mt-3"
                  onClick={() => handelAddModel()}
                >
                  Add Model
                </button>
              </div>
              <div className="w-full mt-10">
                <FormikInput name="price" type="number" placeholder="PRICE" />
              </div>
              <div className="w-full mt-6">
                <FormikTextarea
                  name="description"
                  placeholder={"DESCRIPTION YOUR AD"}
                />
              </div>
              <div className="w-full mt-10">
                <FormikInput name="year" type="number" placeholder="YEAR" />
              </div>
              <div className="w-full mt-10">
                <FormikMultiDropdown
                  name="usage"
                  placeholder={"usage"}
                  options={usageOptions}
                />
              </div>
              {categoriesFromData?.formDataFields?.map((e) => (
                <div className="w-full mt-10">
                  <FormikInput
                    name={e?.key}
                    type={e?.type}
                    placeholder={lang === "en" ? e?.labelEn : e?.labelAr}
                  />
                </div>
              ))}
              <div className="w-full mt-10">
                <FormikMultiDropdown
                  name="citie"
                  placeholder={"citie"}
                  options={citiesOptions}
                  loading={isGettingCiites}
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
                    Next
                  </p>
                  <p className="text-white flex justify-end my-auto md:px-24 px-20">
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
