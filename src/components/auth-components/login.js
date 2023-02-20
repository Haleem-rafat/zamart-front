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

const Login = ({ isLogin, setIsLogin }) => {
  const [IsForgetPass, setIsForgetPass] = useState(false);
  const dispatch = useDispatch();

  const { run, isLoading } = useAxios();
  const logIn = (values) => {
    run(axios.post(api.auth.login, values))
      .then((res) => {
        const { accessToken, refreshToken, fullName } = res.data.data;
        auth.setToken({
          newAccessToken: accessToken,
          newRefreshToken: refreshToken,
        });
        dispatch(Off());
        toast.success("welcome " + fullName);
        window.location.reload();
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
          "A verification mail has been sent to your mail please check it...."
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
      <h1 className="md:text-6xl text-4xl text-start mt-10">LOGIN</h1>
      <h3 className="md:text-xl text-lg text-start mt-6">Hi there!</h3>
      <p className="text-start mt-4 text-sm md:text-base">
        Log in to manage your translators' lists and filter the <br></br>
        results to suit your desired job type
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
                    label={"E-mail"}
                    placeholder={"E-mail"}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="password"
                    type={"password"}
                    label={"Password"}
                    placeholder={"Password"}
                  />
                </div>
                <div className="flex md:gap-x-48 gap-x-14 mx-1 mt-6">
                  <Link
                    onClick={() => setIsForgetPass(true)}
                    className="text-gray-500 text-xs sm:text-base font-normal pt-1"
                  >
                    FORGOT PASSWORD ?
                  </Link>
                  <div>
                    <label className="text-gray-500 ext-xs sm:text-base font-normal cursor-pointer">
                      <input className="mt-1 mr-3" type="checkbox" />
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="">
                  <Button
                    loading={isLoading}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-10 text-white"
                  >
                    LOGIN
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
            setIsLogin(false);
          }}
          className="pt-14 text-primary-gray cursor-pointer text-center"
        >
          CREATE NEW ACCOUNT
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
                    placeholder={"E-mail"}
                  />
                </div>

                <div className="">
                  <Button
                    loading={isLoadingForgetPass}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-10 text-white"
                  >
                    sent verification
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
          onClick={() => setIsForgetPass(false)}
          className="pt-14 text-primary-gray cursor-pointer text-center"
        >
          BACK TO LOGIN
        </p>
      </div>
    </div>
  );
};

export default Login;
