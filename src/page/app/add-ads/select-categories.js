import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import api from "../../../api";
import ButtonCategory from "../../../components/add-ads-componets/category";
import { BreadCrumbAddAds } from "../../../components/shared/Breadcrumb/bread-crumb-add-ads";
import { axios } from "../../../config/axios-config";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import { useQuery } from "../../../hooks/use-query";
import routes from "../../../routes";

const SelectCategories = () => {
  const [lang] = useLanguage("");

  const history = useHistory();
  const query = useQuery();
  const categoriesId = query.get("categories");

  const [categories, setCategories] = useState();

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(api.app.viewCategories).then((res) => {
        setCategories(res?.data?.data);
      })
    );
  }, [run]);
  return (
    <div className="text-white max-w-[1500px] mx-auto animate-in relative pb-8 ">
      <Dimmer
        className=" animate-pulse bg-primary-black-light"
        active={isLoading}
      >
        <Loader active />
      </Dimmer>
      <div className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12">
        <BreadCrumbAddAds />
      </div>
      <h1 className="text-center text-6xl pt-12 font-serifCUS">
        Now choose the right category<br></br> for your ad:
        <p className="text-primary-gray text-2xl pt-6">
          Consultant Psychiatrist - Experience In Adult Psychiatry <br></br>
          And Addiction Medicine I Treat Many
        </p>
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-20 mx-4  ">
        {categories?.map((e) => (
          <ButtonCategory
            id={e?._id}
            category={"Category"}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
          />
        ))}
      </div>
      <div className="flex justify-center mt-20 mb-44 mx-4">
        <button
          onClick={
            categoriesId
              ? () => {
                  history.push(
                    routes.app.ceratitems.selectSubCategory(categoriesId)
                  );
                }
              : ""
          }
          className="md:w-[400px] w-full h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-pink shadow-primary-purple  md:mt-6 mt-8"
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
    </div>
  );
};

export default SelectCategories;
