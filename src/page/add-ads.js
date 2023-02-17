import React, { useEffect, useState } from "react";
import { Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import ButtonCategory from "../components/ads-componets/button-category";
import { FiHome } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import AdsSescrisption from "../components/ads-componets/ads-descrisption";
import useAxios from "../hooks/use-axios";
import { axios } from "../config/axios-config";
import api from "../api";
import { useLanguage } from "../context/language-context";
import useFilter from "../hooks/use-filter";
import { useQuery } from "../hooks/use-query";

const AddAds = () => {
  const [steper, setSetper] = useState(1);
  const [categories, setCategories] = useState();
  const [SubCategories, setSubCategories] = useState();

  const [lang] = useLanguage("");

  const query = useQuery();
  const categoriesValdation = query.get("categories");
  const subCategoriesValdation = query.get("subCategories");
  // console.log("====================================");
  console.log(steper);
  // console.log("====================================");

  const { run, isLoading } = useAxios([]);

  const { run: rungetSubCategories, isLoading: isLoadinggetSubCategories } =
    useAxios([]);

  useEffect(() => {
    run(
      axios.get(api.app.viewCategories).then((res) => {
        setCategories(res?.data?.data);
      })
    );
    if (categories)
      rungetSubCategories(
        axios
          .get(api.app.viewSubCategories(categories && categories[0]?._id))
          .then((res) => {
            setSubCategories(res?.data?.data);
          })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, rungetSubCategories, categories?.length && categories[0]?._id]);

  const sectionsOne = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={15} className="text-primary-gray-dark mt-1" />
        </>
      ),
    },
    { key: "Category", content: "category", active: true },
  ];
  const sectionsTwo = [
    {
      key: "home",
      content: (
        <>
          <FiHome size={15} className="text-primary-gray-dark mt-1" />
        </>
      ),
    },
    { key: "Category1", content: "category", active: false },
    { key: "Category2", content: "category", active: true },
  ];

  return (
    <div className=" text-white max-w-[1500px] mx-auto animate-in">
      {steper === 1 ? (
        <Breadcrumb
          className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12"
          icon="right angle"
          sections={sectionsOne}
        />
      ) : (
        <Breadcrumb
          className="mt-20 border-b-[1px] border-primary-gray-dark w-full pb-12"
          icon="right angle"
          sections={sectionsTwo}
        />
      )}
      <h1 className="text-center text-6xl pt-12">
        Now choose the right category<br></br> for your ad:
        <p className="text-primary-gray text-2xl pt-6">
          Consultant Psychiatrist - Experience In Adult Psychiatry <br></br>
          And Addiction Medicine I Treat Many
        </p>
      </h1>
      <div
        className={`${
          steper === 1 ? "animate-in" : "animate-out hidden "
        } grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-20 mx-4 relative `}
      >
        <Dimmer className="" active={isLoadinggetSubCategories}>
          <Loader active />
        </Dimmer>
        {categories?.map((e) => (
          <ButtonCategory
            id={e?._id}
            category={"Category"}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
            isBig={true}
          />
        ))}
      </div>
      <div
        className={`${
          steper === 2 ? "animate-in" : "animate-out hidden"
        } grid md:grid-cols-3 grid-cols-1 gap-14 mt-20 mx-4 `}
      >
        <Dimmer className="" active={isLoadinggetSubCategories} inverted>
          <Loader active />
        </Dimmer>
        {SubCategories?.map((e) => (
          <ButtonCategory
            id={e?._id}
            ctegoryName={lang === "en" ? e?.nameEn : e?.nameAr}
          />
        ))}
      </div>
      <div
        className={`${
          steper === 3 ? "animate-in" : "animate-out hidden"
        } items-center`}
      >
        <AdsSescrisption />
      </div>
      <div className="flex justify-center mt-20 mb-44 mx-4">
        <button
          // onClick={() => history.push(routes.app.ceratitems)}
          onClick={categoriesValdation ? () => setSetper(steper + 1) : ""}
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

export default AddAds;
