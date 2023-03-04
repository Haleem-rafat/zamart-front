import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import FormikInput from "../shared/formik/formik-input";
import * as Yup from "yup";
import api from "../../api";
import useAxios from "../../hooks/use-axios";
import { axios } from "../../config/axios-config";
import toast from "react-hot-toast";
import { useState } from "react";
import { Off } from "../../redux/sidebare-slice.js";
import { useDispatch } from "react-redux";
import auth from "../../utils/auth";
import { useLanguage } from "../../context/language-context";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const Login = ({ isLogin, setIsLogin }) => {
  const [lang] = useLanguage("");
  const selectedContent = content[lang];
  const [IsForgetPass, setIsForgetPass] = useState(false);
  const dispatch = useDispatch();

  const { run, isLoading } = useAxios();
  const logIn = (values, actions) => {
    run(axios.post(api.auth.login, values))
      .then((res) => {
        const { accessToken, refreshToken, fullName, _id } = res.data.data;
        auth.setToken({
          newAccessToken: accessToken,
          newRefreshToken: refreshToken,
        });
        dispatch(Off());
        toast.success("welcome " + fullName);
        window.location.reload();
        window.localStorage.setItem("my_id", _id);
        actions.resetForm();
      })
      .catch((err) => {
        toast.error(err.errors[0].message);
      });
  };
  const logInSchema = Yup.object({
    email: Yup.string().required("Required field"),
    password: Yup.string().min(3).max(20, "").required("Required field"),
  });

  const { run: runForgetPass, isLoading: isLoadingForgetPass } = useAxios();
  const forgetPass = (values) => {
    runForgetPass(axios.post(api.auth.fogetpass, values))
      .then((res) => {
        toast.loading(
          lang === "en"
            ? "A verification mail has been sent to your mail please check it...."
            : "تم إرسال بريد تحقق إلى بريدك ، يرجى التحقق منه ...."
        );
      })
      .catch((err) => {
        toast.error(err.errors[0].message);
      });
  };
  const forgetPassSchema = Yup.object({
    email: Yup.string().required("Required field"),
  });

  return (
    <div
      className={`${
        isLogin ? "animate-in" : "animate-out hidden h-0"
      } bg-black text-white md:mx-20 mx-4`}
    >
      <img
        className="md:w-28 w-16 md:mt-28 mt-16"
        src={ZAMARTlogo}
        alt="ZAMARTlogo"
      />
      <h1 className="md:text-6xl text-4xl text-start mt-10">
        {selectedContent[localizationKeys.LOGIN]}
      </h1>
      <h3 className="md:text-xl text-lg text-start mt-6">
        {selectedContent[localizationKeys.Hithere]}
      </h3>
      <p className="text-start mt-4 text-sm md:text-base">
        {
          selectedContent[
            localizationKeys.Logintomanageyourtranslatorslistsandfilterthe
          ]
        }
        <br></br>
        {selectedContent[localizationKeys.resultstosuityourdesiredjobtype]}
      </p>

      <div className={IsForgetPass ? "animate-out hidden h-0" : "animate-in"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={logIn}
          validationSchema={logInSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="md:w-[600px] w-full">
                <div className="md:w-[460px] w-full mt-10">
                  <FormikInput
                    name="email"
                    type={"email"}
                    placeholder={selectedContent[localizationKeys.Email]}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="password"
                    type={"password"}
                    label={"Password"}
                    placeholder={selectedContent[localizationKeys.Password]}
                  />
                </div>
                <div className="flex md:gap-x-48 rtl:md:gap-x-72 gap-x-14  mx-1 mt-6">
                  <Link
                    onClick={() => setIsForgetPass(true)}
                    className="text-gray-500 text-xs sm:text-base font-normal pt-1"
                  >
                    {selectedContent[localizationKeys.FORGOTPASSWORD]}
                  </Link>
                  <div>
                    <label className="text-gray-500 ext-xs sm:text-base font-normal cursor-pointer">
                      <input
                        className="mt-1 ltr:mr-3 rtl:ml-3"
                        type="checkbox"
                      />
                      {selectedContent[localizationKeys.RememberMe]}
                    </label>
                  </div>
                </div>
                <div className="">
                  <Button
                    loading={isLoading}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-10 text-white font-serifAR"
                  >
                    {selectedContent[localizationKeys.LOGIN]}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mx-auto relative mt-20">
          <p className="border-t-[1px] border-[#707070] md:w-[460px] w-full my-2 left-0.5">
            <p className="absolute text-white bg-black px-4 -bottom-3 md:left-56 left-36 text-xl">
              {selectedContent[localizationKeys.OR]}
            </p>
          </p>
        </div>
        <p
          onClick={() => {
            setIsLogin(false);
          }}
          className="pt-14 text-primary-gray cursor-pointer text-center"
        >
          {selectedContent[localizationKeys.CREATENEWACCOUNT]}
        </p>
      </div>

      <div className={IsForgetPass ? "animate-in" : "animate-out hidden h-0"}>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={forgetPass}
          validationSchema={forgetPassSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="md:w-[600px] w-full">
                <div className="md:w-[460px] w-full mt-10">
                  <FormikInput
                    name="email"
                    type={"email"}
                    label={"E-mail"}
                    placeholder={selectedContent[localizationKeys.Email]}
                  />
                </div>

                <div className="">
                  <Button
                    loading={isLoadingForgetPass}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-10 text-white font-serifAR"
                  >
                    {selectedContent[localizationKeys.sentverification]}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mx-auto relative mt-20">
          <p className="border-t-[1px] border-[#707070] md:w-[460px] w-full my-2 left-0.5">
            <p className="absolute text-white bg-black px-4 -bottom-3 md:left-56 left-36 text-xl">
              {selectedContent[localizationKeys.OR]}
            </p>
          </p>
        </div>
        <p
          onClick={() => setIsForgetPass(false)}
          className="pt-14 text-primary-gray cursor-pointer text-center"
        >
          {selectedContent[localizationKeys.GOTOLOGIN]}
        </p>
      </div>
    </div>
  );
};

export default Login;
