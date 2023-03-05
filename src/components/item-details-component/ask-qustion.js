import { Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import api from "../../api";
import { authAxios } from "../../config/axios-config";
import { useAuthState } from "../../context/auth-context";
import useAxios from "../../hooks/use-axios";
import FormikInput from "../shared/formik/formik-input";
import FormikTextarea from "../shared/formik/formik-textarea";
import { On } from "../../redux/sidebare-slice.js";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../context/language-context";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const Askqustion = () => {
  const [reason, setReason] = useState("");
  const { itemId } = useParams();
  const { user } = useAuthState();
  const dispatch = useDispatch();
  const [lang, setLang] = useLanguage("");
  const selectedContent = content[lang];
  const sendEnquirySchema = Yup.object({
    description: Yup.string().required("Required field"),
    enquiryUserFullName: Yup.string().required("Required field"),
    enquiryUserEmail: Yup.string().min(3).required("Required field"),
    enquiryUserPhone: Yup.string().min(3).max(20).required("Required field"),
  });

  const { run: runSendEnquiry, isLoading: isLoadingSendEnquiry } = useAxios([]);
  const sendEnquiry = (values, actions) => {
    const body = {
      description: values?.description,
      enquiryUserFullName: values?.enquiryUserFullName,
      enquiryUserEmail: values?.enquiryUserEmail,
      enquiryUserPhone: values?.enquiryUserPhone,
      reason: reason,
    };
    if (user) {
      runSendEnquiry(
        authAxios
          .post(api.app.sendEnquiry(itemId), body)
          .then((res) => {
            toast.success("Send Enquiry success");
            actions.resetForm();
          })
          .catch((err) => {
            toast.error(err.errors[0].message);
          })
      );
    } else {
      toast.error(
        lang === "en"
          ? "You must be logged in to Send Enquiry this user's profile"
          : "يجب عليك تسجيل الدخول لإرسال استفسار الملف الشخصي لهذا المستخدم"
      );
      dispatch(On());
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-white pt-8">
        {selectedContent[localizationKeys.ASKTHEDEALERAQUESTION]}
      </h1>
      <div className=" ">
        <Formik
          initialValues={{
            description: "",
            enquiryUserFullName: "",
            enquiryUserEmail: "",
            enquiryUserPhone: "",
          }}
          onSubmit={sendEnquiry}
          validationSchema={sendEnquirySchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="mx-auto">
                <div className="md:w-[341px] w-full mt-5">
                  <FormikTextarea
                    name="description"
                    placeholder={
                      selectedContent[
                        localizationKeys.IMINTERESTEDPLEASECONTACTME
                      ]
                    }
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserFullName"
                    type={"FULL NAME"}
                    placeholder={selectedContent[localizationKeys.FULLNAME]}
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserEmail"
                    type={"E-MAIL"}
                    placeholder={selectedContent[localizationKeys.Email]}
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserPhone"
                    type={"PHONE NUMBER"}
                    placeholder={selectedContent[localizationKeys.PHONE]}
                  />
                </div>
                <div className="flex flex-col sm:mt-5 mt-6 ml-2">
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() => setReason("CONTACT ME ABOUT INSURANCE")}
                      className="sm:mt-0.5   mr-3 ml-3"
                      type="checkbox"
                    />
                    {selectedContent[localizationKeys.CONTACTMEABOUTINSURANCE]}
                  </label>
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() => setReason("CONFIRM DEALER'S RESPONSE")}
                      className="sm:mt-0.5  mr-3 ml-3"
                      type="checkbox"
                    />
                    {selectedContent[localizationKeys.CONFIRMDEALERRESPONSE]}
                  </label>
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() =>
                        setReason("FILL IN THIS FORM FOR ME NEXT TIME")
                      }
                      className="sm:mt-0.5   mr-3 ml-3"
                      type="checkbox"
                    />
                    {
                      selectedContent[
                        localizationKeys.FILLINTHISFORMFORMENEXTTIME
                      ]
                    }
                  </label>
                </div>
                <div className="flex justify-start">
                  <Button
                    loading={isLoadingSendEnquiry}
                    className="md:w-[460px] w-full sm:h-16 h-12 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-5 text-white font-serifAR "
                  >
                    {selectedContent[localizationKeys.SENDENQUIRY]}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Askqustion;
