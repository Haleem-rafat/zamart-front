import { Formik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import api from "../../../api";
import FormikInput from "../../../components/shared/formik/formik-input";
import FormikTextarea from "../../../components/shared/formik/formik-textarea";
import { axios } from "../../../config/axios-config";
import useAxios from "../../../hooks/use-axios";
import facbook from "../../../../src/assets/img/facbook.png";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";
import { useLanguage } from "../../../context/language-context";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";

const ContactUs = () => {
  const { run, isLoading } = useAxios({});

  const [lang] = useLanguage("");
  const selectedContent = content[lang];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const sendContactUs = (values) => {
    run(axios.post(api.app.contactUs, values))
      .then((res) => {
        toast.success("contact us send successfuly");
      })
      .catch((err) => {
        toast.error("contact us faild");
      });
  };
  const sendContactUsSchema = Yup.object({
    firstName: Yup.string().required("Required field"),
    familyName: Yup.string().min(3).required("Required field"),
    email: Yup.string().min(3).required("Required field"),
    subject: Yup.string().min(3).required("Required field"),
    message: Yup.string().min(3).required("Required field"),
  });
  return (
    <div>
      <div className="grid sm:grid-cols-5 grid-cols-1 gap-x-10  animate-in">
        <div className="col-span-2 ltr:sm:ml-36 rtl:sm:mr-36 ml-0">
          <p className="text-primary-gray text-xl mt-16">
            {selectedContent[localizationKeys.TALKTOUS]}
          </p>
          <h1 className="text-white text-7xl md:text-6xl">
            {selectedContent[localizationKeys.CONTACT]} <br></br>{" "}
            {selectedContent[localizationKeys.US]}
          </h1>
          <div className="bg-primary-gray-subdark mt-11 ">
            <Formik
              initialValues={{
                firstName: "",
                familyName: "",
                email: "",
                subject: "",
                message: "",
              }}
              onSubmit={sendContactUs}
              validationSchema={sendContactUsSchema}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <div className="mx-12">
                    <h1 className="text-white text-5xl md:text-4xl text-center py-7">
                      {selectedContent[localizationKeys.TAKEACOFFEEWITHUS]}
                    </h1>
                    <div className="flex gap-x-5 ">
                      <div className="w-full">
                        <FormikInput
                          name="firstName"
                          type={"text"}
                          placeholder={
                            selectedContent[localizationKeys.firstName]
                          }
                        />
                      </div>
                      <div className="w-full">
                        <FormikInput
                          name="familyName"
                          type={"text"}
                          placeholder={
                            selectedContent[localizationKeys.familyName]
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full py-5">
                      <FormikInput
                        name="email"
                        type={"email"}
                        placeholder={selectedContent[localizationKeys.Email]}
                      />
                    </div>
                    <div className="w-full pb-5">
                      <FormikInput
                        name="subject"
                        type={"text"}
                        placeholder={selectedContent[localizationKeys.subject]}
                      />
                    </div>
                    <div className="w-full">
                      <FormikTextarea
                        name="message"
                        placeholder={selectedContent[localizationKeys.message]}
                      />
                    </div>

                    <div className="">
                      <Button
                        loading={isLoading}
                        className="md:w-[276px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-12 mb-14 text-white font-serifAR"
                      >
                        {selectedContent[localizationKeys.SEND]}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="mx-auto flex flex-col justify-between gap-y-10 mt-7">
          <div className="bg-primary-gray-subdark text-primary-gray h-full ltr:pl-6 rtl:pr-6">
            <p className="text-xl pt-10 ">
              {" "}
              {selectedContent[localizationKeys.contactUs]}
            </p>
            <h1 className="text-white text-3xl md:text-2xl pt-2">
              {selectedContent[localizationKeys.DOYOU]}
              <br></br> {selectedContent[localizationKeys.HAVEANY]}
              <br></br> {selectedContent[localizationKeys.QUESTIONS]}?
            </h1>
            <AiOutlineWhatsApp className="mt-8" size={30} />
            <p className="text-white text-2xl md:text-xl">+20 01111664236</p>
            <TbBrandTelegram className="mt-8" size={30} />
            <p className="text-white text-2xl md:text-xl pb-8">
              PCD@GMAIL.COM.COM
            </p>
          </div>
          <img src={facbook} alt="facbook" />
        </div>
        <div className="col-span-2 bg-primary-gray-subdark mt-7 ltr:pl-14 rtl:pr-14">
          <h1 className="text-7xl md:text-6xl text-white pt-16">
            {selectedContent[localizationKeys.ForBuyers]}
            <br></br> {selectedContent[localizationKeys.ByBuyers]}
          </h1>
          <p className="border-4 border-primary-cyan-light w-32 my-14"></p>
          <p className="text-primary-gray my-4 text-xl font-normal">
            {
              selectedContent[
                localizationKeys.itisalongestablishedfactthatareaderwillbe
              ]
            }
            <br></br>
            {selectedContent[localizationKeys.distractedbythereadablecontent]}
            <br></br> {selectedContent[localizationKeys.loremipsumisthatithasa]}
            <br></br> {selectedContent[localizationKeys.TALKTOUS]}
          </p>
          <p className="text-primary-gray my-4 text-xl font-normal">
            {
              selectedContent[
                localizationKeys.itisalongestablishedfactthatareaderwillbe
              ]
            }
            <br></br>
            {selectedContent[localizationKeys.distractedbythereadablecontent]}
            <br></br> {selectedContent[localizationKeys.loremipsumisthatithasa]}
            <br></br> {selectedContent[localizationKeys.TALKTOUS]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
