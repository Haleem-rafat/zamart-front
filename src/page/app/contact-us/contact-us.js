import { Formik } from "formik";
import React from "react";
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

const ContactUs = () => {
  const { run, isLoading } = useAxios({});

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
      <div className="grid grid-cols-5">
        <div className="col-span-2 ml-36">
          <p className="text-primary-gray text-xl mt-16">TALK TO US</p>
          <h1 className="text-white text-7xl">
            CONTACT <br></br>US
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
                  <div className=" mx-12">
                    <h1 className="text-white text-5xl text-center py-7">
                      TAKE A COFFEE WITH US
                    </h1>
                    <div className="flex gap-x-5 ">
                      <div className="w-full">
                        <FormikInput
                          name="firstName"
                          type={"text"}
                          placeholder={"firstName"}
                        />
                      </div>
                      <div className="w-full">
                        <FormikInput
                          name="familyName"
                          type={"text"}
                          placeholder={"FAMILY NAME"}
                        />
                      </div>
                    </div>
                    <div className="w-full py-5">
                      <FormikInput
                        name="email"
                        type={"email"}
                        placeholder={"E-MAIL"}
                      />
                    </div>
                    <div className="w-full pb-5">
                      <FormikInput
                        name="subject"
                        type={"text"}
                        placeholder={"SUBJECT"}
                      />
                    </div>
                    <div className="w-full">
                      <FormikTextarea name="message" placeholder={"MESSAGE"} />
                    </div>

                    <div className="">
                      <Button
                        loading={isLoading}
                        className="md:w-[276px] w-full sm:h-16 h-14 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink text-xl mt-5 mb-10 text-white"
                      >
                        SEND
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="mx-auto flex flex-col justify-between gap-y-10 mt-7">
          <div className="bg-primary-gray-subdark text-primary-gray h-full pl-6">
            <p className="text-xl pt-10 ">CONTACT US</p>
            <h1 className="text-white text-3xl pt-2">
              DO YOU <br></br>HAVE ANY<br></br> QUESTIONS?
            </h1>
            <AiOutlineWhatsApp className="mt-8" size={30} />
            <p className="text-white text-2xl">+20 01111664236</p>
            <TbBrandTelegram className="mt-8" size={30} />
            <p className="text-white text-2xl">PCD@GMAIL.COM.COM</p>
          </div>
          <img src={facbook} alt="facbook" />
        </div>
        <div className="col-span-2 bg-primary-gray-subdark mt-7 pl-14">
          <h1 className="text-7xl text-white pt-16">
            For Buyers <br></br>By Buyers
          </h1>
          <p className="border-4 border-primary-cyan-light w-32 my-14"></p>
          <p className="text-primary-gray my-4 text-xl font-normal">
            it is a long established fact that a reader will be <br></br>
            distracted by the readable content<br></br> of a page when looking
            at its layout. the point of using<br></br> lorem ipsum is that it
            has a <br></br> more-or-less normal
          </p>
          <p className="text-primary-gray text-xl font-normal mt-14">
            it is a long established fact that a reader will be <br></br>
            distracted by the readable content<br></br> of a page when looking
            at its layout. the point of using<br></br> lorem ipsum is that it
            has a <br></br> more-or-less normal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
