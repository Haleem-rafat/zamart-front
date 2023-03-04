import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import imgTest from "../../../src/assets/img/img_test.png";
import api from "../../api";
import { axios } from "../../config/axios-config";
import useAxios from "../../hooks/use-axios";
import useFilter from "../../hooks/use-filter";
import ZamartLoading from "../shared/lotties/zamart-loading";
import ItemCard from "./item-card";

const ItemsDrid = () => {
  const [categoriesFilter] = useFilter("category", "");
  const [subCategoriesFilter] = useFilter("subCategory", "");
  const { search } = useLocation();
  const [data, setData] = useState();
  const { run, isLoading } = useAxios([]);
  useEffect(() => {
    run(
      axios.get(`${api.app.viewAllItems}${search}`).then((res) => {
        setData(res?.data?.data);
      })
    );
  }, [run, search]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-x-5 gap-x-0 my-10 sm:mx-5 mx-auto ">
      <Dimmer
        className=" animate-pulse bg-primary-black-light "
        active={isLoading}
      >
        {/* <Loader active /> */}
        <ZamartLoading />
      </Dimmer>
      {data?.map((e) => (
        <ItemCard
          id={e?._id}
          itemImge={e?.images[0]?.img || ""}
          adsName={e?.brand || ""}
          price={e?.price || ""}
          date={new Date(e?.updatedAt).toLocaleDateString("en-GB") || ""}
          itemName={e?.title || ""}
          userName={e?.user?.fullName || ""}
          KM={e?.kiloMeters || ""}
        />
      ))}
    </div>
  );
};

export default ItemsDrid;
