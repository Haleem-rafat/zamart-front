import { Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import FormikInput from "../shared/formik/formik-input";
import * as Yup from "yup";
import api from "../../api";
import useAxios from "../../hooks/use-axios";
import { axios } from "../../config/axios-config";
import toast from "react-hot-toast";
import content from "../../localization/content";
import { useLanguage } from "../../context/language-context";
import localizationKeys from "../../localization/localization-keys";

const SignUp = ({ isLogin, setIsLogin }) => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  const { run, isLoading } = useAxios();

  const signup = (values) => {
    run(axios.post(api.auth.registeration, values))
      .then((res) => {
        toast.loading(
          "A verification mail has been sent to your mail please check it...."
        );
      })
      .catch((err) => {
        toast.error(err.errors[0].message);
      });
  };
  const signupSchema = Yup.object({
    fullName: Yup.string().min(3).max(20, "").required("Required field"),
    email: Yup.string().required("Required field"),
    phone: Yup.string().min(3).max(20, "").required("Required field"),
    password: Yup.string().min(3).max(20, "").required("Required field"),
  });
  return (
    <div
      className={`${
        isLogin ? "animate-out h-0 hidden" : "animate-in"
      } bg-black text-white md:mx-20 mx-8`}
    >
      <img
        className="md:w-28 w-16 md:mt-28 mt-16"
        src={ZAMARTlogo}
        alt="ZAMARTlogo"
      />
      <h1 className="md:text-6xl text-4xl text-start mt-10">
        {selectedContent[localizationKeys.NEWAccount]}
      </h1>
      <h3 className="md:text-xl text-lg text-start mt-6">
        {" "}
        {selectedContent[localizationKeys.Hithere]}
      </h3>
      <p className="text-start mt-4 text-sm md:text-base">
        {
          selectedContent[
            localizationKeys.Logintomanageyourtranslatorslistsandfilterthe
          ]
        }{" "}
        <br></br>
        {selectedContent[localizationKeys.resultstosuityourdesiredjobtype]}
      </p>

      <div>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            password: "",
          }}
          onSubmit={signup}
          validationSchema={signupSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="md:w-[600px] w-full">
                <div className="md:w-[460px] w-full mt-10">
                  <FormikInput
                    name="fullName"
                    type={"text"}
                    placeholder={selectedContent[localizationKeys.FULLNAME]}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="email"
                    type={"email"}
                    placeholder={selectedContent[localizationKeys.Email]}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="phone"
                    type={"text"}
                    placeholder={selectedContent[localizationKeys.PHONE]}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="password"
                    type={"password"}
                    placeholder={selectedContent[localizationKeys.PASSWORD]}
                  />
                </div>
                <div className="flex justify-start sm:mt-5 mt-8 ml-2">
                  <label className="text-gray-500 text-xs sm:text-basefont-normal cursor-pointer">
                    <input
                      className="sm:mt-1 mt-0  mr-3"
                      type="checkbox"
                      required
                    />
                    I AGREE TO THE TERMS AND CONDITIONS
                  </label>
                </div>
                <div className="flex justify-start">
                  <Button
                    loading={isLoading}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-8 text-white"
                  >
                    SIGN UP
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mx-auto relative mt-20">
          <p className="border-t-[1px] border-[#707070] md:w-[460px] w-full my-2 left-0.5">
            <p className="absolute text-white bg-black px-4 -bottom-3 md:left-56 left-36 text-xl">
              OR
            </p>
          </p>
        </div>
        <p
          onClick={() => {
            setIsLogin(true);
          }}
          className="pt-14 pb-5 text-primary-gray cursor-pointer text-center"
        >
          GO TO LOG IN
        </p>
      </div>
    </div>
  );
};

export default SignUp;
