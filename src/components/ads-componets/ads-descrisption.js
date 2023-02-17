import { Formik } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";

import * as Yup from "yup";
import FormikMultiDropdown from "../shared/formik/formik-dropdown";
import FormikInput from "../shared/formik/formik-input";
import FormikTextarea from "../shared/formik/formik-textarea";

const AdsDescrisption = ({ steper }) => {
  const adsDescrisptionSchema = Yup.object({
    titel: Yup.string().required("Required field"),
    price: Yup.string().min(3).max(8).required("Required field"),
    descrisption: Yup.string().min(3).required("Required field"),
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
              usage: "",
            }}
            // onSubmit={logIn}
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
