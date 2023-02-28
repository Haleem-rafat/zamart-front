import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Dimmer } from "semantic-ui-react";
import api from "../../../api";
import AccordionMenu from "../../../components/search-copmonets/accordion-menu";
import HeroSearchSection from "../../../components/search-copmonets/hero-search-section";
import CardItemMedium from "../../../components/shared/card-item-medium";
import ZamartEmty from "../../../components/shared/lotties/zamart-emty";
import ZamartLoading from "../../../components/shared/lotties/zamart-loading";
import PaginationApp from "../../../components/shared/pagination";
import useAxios from "../../../hooks/use-axios";

const SearchPage = () => {
  const { search } = useLocation();
  const [data, setData] = useState();
  const [pagenationData, setPagenationData] = useState();
  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(`${api.app.viewAllItems}${search}`).then((res) => {
        setData(res?.data?.data);
        setPagenationData(res?.data?.totalPages);
      })
    );
  }, [run, search]);

  return (
    <div className="h-full">
      <div>
        <HeroSearchSection />
      </div>
      <div className=" ">
        <Dimmer
          className=" animate-pulse bg-primary-black-light  h-full"
          active={isLoading}
        >
          <ZamartLoading />
        </Dimmer>
        <div>
          {data?.length === 0 ? (
            <div className=" mt-32">
              <ZamartEmty />
            </div>
          ) : (
            <div className="sm:flex justify-between block">
              <div className="w-96 mx-auto mt-36 hidden sm:block">
                <AccordionMenu />
              </div>
              <div className="sm:mx-14 mx-auto">
                <p className="text-white text-4xl py-10 px-6">Search Ruslt</p>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5 my-auto sm:mx-5  ">
                  {data?.map((e) => (
                    <CardItemMedium
                      id={e?._id}
                      itemImge={e?.images[0]?.img || ""}
                      adsName={e?.brand || ""}
                      price={e?.price || ""}
                      date={
                        new Date(e?.updatedAt).toLocaleDateString("en-GB") || ""
                      }
                      itemName={e?.title || ""}
                      userName={e?.user?.fullName || ""}
                      KM={e?.kiloMeters || ""}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center my-4 mb-10">
          <PaginationApp totalPages={pagenationData} totalItem={9} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
