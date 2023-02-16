import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../../api";
import useAxios from "../../hooks/use-axios";
import * as Yup from "yup";
import ZAMARTlogo from "../../../src/assets/logo/ZAMART_logo.svg";
import { Form, Formik } from "formik";
import FormikInput from "../shared/formik/formik-input";
import { Link, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import routes from "../../routes";
import useLocalStorage from "../../hooks/use-localstorage";
import { useQuery } from "../../hooks/use-query";
import { useLanguage } from "../../context/language-context";

const ReserPassComponents = () => {
  const [lang] = useLanguage("");
  // const selectedContent = content[lang];
  const history = useHistory();
  const query = useQuery();
  const tokenEdit = query.get("token");
  const [token] = useLocalStorage("tokenEdit", tokenEdit);

  const { run, isLoading } = useAxios();
  const resetpass = (values) => {
    const body = {
      token: token,
      newPassword: values.password,
    };
    run(axios.post(api.auth.resetCredentials, body))
      .then((res) => {
        toast.success(
          lang === "en"
            ? "Your password has been changed successfully"
            : " تم تغيير كلمة المرور الخاصة بك بنجاح"
        );
      })
      .catch((err) => {
        toast.error(err.errors[0].message);
      });
  };
  const resetpassSchema = Yup.object({
    password: Yup.string().min(8).max(20).required("Required field"),
    confarmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], `not match`)
      .required("Required field"),
  });

  return (
    <div className=" bg-black text-white md:mx-20 mx-4 animate-in">
      <img
        className="md:w-28 w-16 md:mt-28 mt-16"
        src={ZAMARTlogo}
        alt="ZAMARTlogo"
      />
      <h1 className="md:text-6xl text-4xl text-start mt-10">RESET PASSWORD</h1>

      <div>
        <Formik
          initialValues={{
            password: "",
            confarmpassword: "",
          }}
          onSubmit={resetpass}
          validationSchema={resetpassSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="md:w-[600px] pt-5 w-full text-black">
                <div className="md:w-[460px] w-full mt-10">
                  <FormikInput
                    name="password"
                    type={"password"}
                    placeholder={"New Password"}
                  />
                </div>
                <div className="md:w-[460px] w-full mt-6">
                  <FormikInput
                    name="confarmpassword"
                    type={"password"}
                    placeholder={"Re Enter Password"}
                  />
                </div>
                <div className="">
                  <Button
                    loading={isLoading}
                    onClick={() => {
                      // history.push(routes.dashboard.app);
                    }}
                    className="md:w-[460px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-10 text-white"
                  >
                    RESET PASSWORD
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
            history.push(routes.app.home);
          }}
          className="pt-14 text-primary-gray cursor-pointer text-center"
        >
          GO TO HOME
        </p>
      </div>
    </div>
  );
};

export default ReserPassComponents;
