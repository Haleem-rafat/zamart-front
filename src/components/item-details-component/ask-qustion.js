import { Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import api from "../../api";
import { authAxios } from "../../config/axios-config";
import useAxios from "../../hooks/use-axios";
import FormikInput from "../shared/formik/formik-input";
import FormikTextarea from "../shared/formik/formik-textarea";

const Askqustion = () => {
  const [reason, setReason] = useState("");
  const { itemId } = useParams();

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
  };
  return (
    <div>
      <h1 className="text-3xl text-white pt-10">ASK THE DEALER A QUESTION</h1>
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
                <div className="md:w-[341px]  w-full mt-8">
                  <FormikTextarea
                    name="description"
                    placeholder={"I'M INTERESTED, PLEASE CONTACT ME?"}
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserFullName"
                    type={"email"}
                    placeholder={"E-MAIL"}
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserEmail"
                    type={"text"}
                    placeholder={"PHONE"}
                  />
                </div>
                <div className="md:w-[341px] w-full mt-6">
                  <FormikInput
                    name="enquiryUserPhone"
                    type={"text"}
                    placeholder={"PHONE"}
                  />
                </div>
                <div className="flex flex-col sm:mt-5 mt-8 ml-2">
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() => setReason("CONTACT ME ABOUT INSURANCE")}
                      className="sm:mt-0.5 mt-2  mr-3"
                      type="checkbox"
                    />
                    CONTACT ME ABOUT INSURANCE
                  </label>
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() => setReason("CONFIRM DEALER'S RESPONSE")}
                      className="sm:mt-0.5 mt-2  mr-3"
                      type="checkbox"
                    />
                    CONFIRM DEALER'S RESPONSE
                  </label>
                  <label className="text-gray-500 text-xs sm:text-base font-normal cursor-pointer pt-2">
                    <input
                      onClick={() =>
                        setReason("FILL IN THIS FORM FOR ME NEXT TIME")
                      }
                      className="sm:mt-0.5 mt-2  mr-3"
                      type="checkbox"
                    />
                    FILL IN THIS FORM FOR ME NEXT TIME
                  </label>
                </div>
                <div className="flex justify-start">
                  <Button
                    loading={isLoadingSendEnquiry}
                    className="md:w-[460px] w-full sm:h-16 h-12 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-5 text-white"
                  >
                    SEND ENQUIRY
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
