import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Form } from "semantic-ui-react";

import * as Yup from "yup";
import api from "../../api";
import { useLanguage } from "../../context/language-context";
import useAxios from "../../hooks/use-axios";
import FormikMultiDropdown from "../shared/formik/formik-dropdown";
import FormikInput from "../shared/formik/formik-input";
import FormikTextarea from "../shared/formik/formik-textarea";

const AdsDescrisption = ({ steper, setSetper, setAdsDescrisption }) => {
  const [lang] = useLanguage("");
  const [citiesOptions, setCitiesOptions] = useState([]);

  const { run: getCities, isLoading: isGettingCiites } = useAxios({});

  useEffect(() => {
    getCities(axios.get(`${api.cities.default}`)).then(({ data }) => {
      console.log(data);
      const citiesOptions = data?.data?.map((e) => ({
        key: e?._id,
        value: e?._id,
        text: `${lang === "en" ? e.nameEn : e.nameAr}`,
      }));
      setCitiesOptions(citiesOptions);
    });
  }, [getCities, lang]);

  const adsDescrisption = (values) => {
    setAdsDescrisption(values);
    setSetper(4);
  };

  const adsDescrisptionSchema = Yup.object({
    titel: Yup.string().required("Required field"),
    price: Yup.string().max(8).required("Required field"),
    descrisption: Yup.string().required("Required field"),
    usage: Yup.string().required("Required field"),
    kilometers: Yup.string().required("Required field"),
    year: Yup.string().required("Required field"),
    sellerType: Yup.string().required("Required field"),
    warranty: Yup.string().required("Required field"),
    finalDriveSystem: Yup.string().required("Required field"),
    wheels: Yup.string().required("Required field"),
    manufacturer: Yup.string().required("Required field"),
    engineSize: Yup.string().required("Required field"),
    locateYourMotorcycle: Yup.string().required("Required field"),
    brand: Yup.string().required("Required field"),
    model: Yup.string().required("Required field"),
    citie: Yup.string().required("Required field"),
  });

  const usageOptions = [
    {
      key: "used",
      text: "Used",
      value: "used",
    },
    {
      key: "new",
      text: "New",
      value: "new",
    },
  ];

  return (
    <div>
      <div>
        <div
          className={
            steper ? "animate-out hidden h-0 w-full " : "animate-in w-full "
          }
        >
          <Formik
            initialValues={{
              titel: "",
              price: "",
              descrisption: "",
              model: "",
              brand: "",
              usage: "",
              kilometers: "",
              year: "",
              sellerType: "",
              warranty: "",
              finalDriveSystem: "",
              wheels: "",
              manufacturer: "",
              engineSize: "",
              locateYourMotorcycle: "",
              citie: "",
            }}
            onSubmit={adsDescrisption}
            validationSchema={adsDescrisptionSchema}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="max-w-2xl mx-auto">
                  <div className="w-full mt-10">
                    <FormikInput
                      name="titel"
                      type={"text"}
                      placeholder={"Titel"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="price"
                      type={"number"}
                      placeholder={"Price"}
                    />
                  </div>
                  <div className="w-full mt-10">
                    <FormikInput
                      name="brand"
                      type={"text"}
                      placeholder={"Brand"}
                    />
                  </div>
                  <div className="w-full mt-10">
                    <FormikInput
                      name="model"
                      type={"text"}
                      placeholder={"Model"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikTextarea
                      name="descrisption"
                      placeholder={"descrisption your ad"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikMultiDropdown
                      name="usage"
                      placeholder={"usage"}
                      options={usageOptions}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="kilometers"
                      type={"number"}
                      placeholder={"kilometers"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="year"
                      type={"number"}
                      placeholder={"year"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="sellerType"
                      type={"text"}
                      placeholder={"seller type"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="warranty"
                      type={"text"}
                      placeholder={"warranty"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="finalDriveSystem"
                      type={"text"}
                      placeholder={"final drive system"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="wheels"
                      type={"text"}
                      placeholder={"wheels"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="manufacturer"
                      type={"text"}
                      placeholder={"manufacturer"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="engineSize"
                      type={"text"}
                      placeholder={"engine size"}
                    />
                  </div>
                  <div className="w-full mt-6">
                    <FormikInput
                      name="locateYourMotorcycle"
                      type={"text"}
                      placeholder={"locate your motorcycle"}
                    />
                    <div className="w-full mt-6">
                      <FormikMultiDropdown
                        name="citie"
                        placeholder={"citie"}
                        options={citiesOptions}
                        loading={isGettingCiites}
                      />
                    </div>
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
      </div>
    </div>
  );
};

export default AdsDescrisption;
