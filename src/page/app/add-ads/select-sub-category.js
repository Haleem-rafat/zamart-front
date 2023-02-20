import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import api from "../../../api";
import ButtonSubCategory from "../../../components/add-ads-componets/sub-category";
import { BreadCrumbAddAds } from "../../../components/shared/Breadcrumb/bread-crumb-add-ads";
import { axios } from "../../../config/axios-config";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import useLocalStorage from "../../../hooks/use-localstorage";
import { useQuery } from "../../../hooks/use-query";
import routes from "../../../routes";

const SelectSubCategories = () => {
  const [lang] = useLanguage("");

  const query = useQuery();
  const history = useHistory();
  const { categoryId } = useParams();
  const subCategoriesId = query.get("subCategories");
  const complmentartCategoriesID = query.get("complmentartCategories");
  const [subCatID, setCubCatID] = useLocalStorage("subCategory_Id", "");
  const [CatID, setCatID] = useLocalStorage("category_id", "");

  const [SubCategories, setSubCategories] = useState();

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    if (categoryId)
      run(
        axios.get(api.app.viewSubCategories(categoryId)).then((res) => {
          setSubCategories(res?.data?.data);
        })
      );
  }, [categoryId, run]);

  useEffect(() => {
    if (categoryId)
      run(
        axios.get(api.app.viewSubCategories(categoryId)).then((res) => {
          setSubCategories(res?.data?.data);
        })
      );
  }, [categoryId, run]);

  const HandelNextPag = (id) => {
    run(
      axios.get(api.app.ViewComplmentartCategories(id)).then((res) => {
        if (res?.data?.data.length) {
          return history.push(
            routes.app.ceratitems.selectComplementCategory(subCategoriesId),
            {
              categories_ID: categoryId,
              subCategories_ID: subCategoriesId,
              Complement_ID: complmentartCategoriesID,
            }
          );
        } else
          history.push(routes.app.ceratitems.addDescription, {
            categories_ID: categoryId,
            subCategories_ID: subCategoriesId,
          });
      })
    );
  };

  return (
    <div className="text-white max-w-[1500px] mx-auto animate-in relative pb-8">
      <Dimmer className=" animate-pulse" active={isLoading}>
        <Loader active />
      </Dimmer>
      <div className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12">
        <BreadCrumbAddAds sub={categoryId} />
      </div>
      <h1 className="text-center text-6xl pt-12">
        Now choose the right category<br></br> for your ad:
        <p className="text-primary-gray text-2xl pt-6">
          Consultant Psychiatrist - Experience In Adult Psychiatry <br></br>
          And Addiction Medicine I Treat Many
        </p>
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-14 mt-20 mx-4  ">
        {SubCategories?.map((e) => (
          <ButtonSubCategory
            id={e?._id}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
          />
        ))}
      </div>
      <div className="flex justify-center mt-20 mb-44 mx-4">
        <button
          onClick={
            subCategoriesId
              ? () => {
                  HandelNextPag(subCategoriesId);
                  setCubCatID(subCategoriesId);
                  setCatID(categoryId);
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

export default SelectSubCategories;
