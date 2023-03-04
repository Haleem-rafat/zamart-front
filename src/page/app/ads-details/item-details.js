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
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import ItemCard from "../../../components/home-components/item-card";
import { date } from "yup";
import { useAuthState } from "../../../context/auth-context";

const ItemDetails = () => {
  const [data, setData] = useState();
  const [itemData, setItemData] = useState();

  const { itemId } = useParams();

  const { user } = useAuthState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(api.app.viewItemById(itemId)).then((res) => {
        setData(res?.data);
      })
    );
  }, [itemId, run, data?.length]);

  const { run: runitemData, isLoading: isloadingitemData } = useAxios([]);
  useEffect(() => {
    runitemData(
      axios
        .get(`${api.app.viewAllItems}?category=${data?.data?.category?._id}`)
        .then((res) => {
          setItemData(res?.data?.data);
        })
    );
  }, [data?.data?.category?._id, runitemData]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full animate-in relative mt-10">
      <Dimmer
        className="animate-pulse bg-primary-black-light"
        active={isLoading || isloadingitemData}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      <div className="lg:flex justify-between md:grid grid-cols-1 ">
        <div className="mx-auto">
          <ImgSlider images={data?.data?.images} />
        </div>
        <div
          className={
            user?.id === data?.data?.user?._id
              ? "hidden"
              : "sm:flex grid grid-cols-1 justify-end md:justify-center  w-full ml-auto mx-auto"
          }
        >
          <BuySections data={data} />
          <div className="w-[419px] h-[680px] bg-black overflow-y-auto  px-11">
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5 my-12 sm:mx-5 mx-auto relative h-full ">
        <Dimmer
          className="animate-pulse bg-primary-black-light h-full"
          active={isloadingitemData}
        >
          {/* <Loader active /> */}
          <ZamartLoading />
        </Dimmer>
        {itemData?.map(
          (e, index) =>
            index < 4 && (
              <ItemCard
                id={e?._id}
                itemImge={e?.images[0]?.img || ""}
                itemName={e?.brand || ""}
                price={e?.price || ""}
                date={new Date(e?.updatedAt).toLocaleDateString("en-GB") || ""}
                adsName={e?.title || ""}
                userName={e?.user?.fullName || ""}
                KM={e?.kiloMeters || ""}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
