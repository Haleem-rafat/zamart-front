import React, { useEffect, useState } from "react";
import {} from "react-icons/md";
import { useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import api from "../../../api";
import ImgSlider from "../../../components/item-details-component/img-slider";
import { useLanguage } from "../../../context/language-context";
import useAxios from "../../../hooks/use-axios";
import BuySections from "../../../components/item-details-component/buy-sections";
import Askqustion from "../../../components/item-details-component/ask-qustion";
import axios from "axios";
import ItemOverview from "../../../components/item-details-component/item-overview";

const ItemDetails = () => {
  const [data, setData] = useState();

  const { itemId } = useParams();
  const [lang, setLang] = useLanguage("");

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(api.app.viewItemById(itemId)).then((res) => {
        setData(res?.data);
      })
    );
  }, [itemId, run, data?.length]);

  return (
    <div className="w-full animate-in relative mt-10">
      <Dimmer
        className="animate-pulse bg-primary-black-light"
        active={isLoading}
      >
        <Loader active />
      </Dimmer>
      <div className="lg:flex justify-between md:grid grid-cols-1 ">
        <div className="mx-auto">
          <ImgSlider images={data?.data?.images} />
        </div>
        <div className="flex justify-end flex-wrap w-full ml-auto">
          <BuySections data={data} />
          <div className="w-[419px] h-[780px] bg-black overflow-y-auto  px-11">
            <Askqustion />
          </div>
        </div>
      </div>
      <ItemOverview data={data} />
      <div>
        <h1 className="text-white text-6xl text-center mt-32">
          YOU MAY ALSO LIKE
        </h1>
        <p className="text-xl text-primary-gray-subMed text-center">
          MORE OPTION YOU LIKE
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
