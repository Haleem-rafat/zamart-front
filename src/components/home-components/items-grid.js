import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import imgTest from "../../../src/assets/img/img_test.png";
import api from "../../api";
import { axios } from "../../config/axios-config";
import useAxios from "../../hooks/use-axios";
import useFilter from "../../hooks/use-filter";
import ItemCard from "./item-card";

const ItemsDrid = () => {
  const [categoriesFilter] = useFilter("categories", "");
  const [subCategoriesFilter] = useFilter("subCategories", "");
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
    <div id="Categories">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-10 gap-x-5 my-10 mx-5 relative ">
        <Dimmer className="h-full" active={isLoading}>
          <Loader active />
        </Dimmer>
        {data?.map((e) => (
          <ItemCard
            itemImge={e?.images[0]?.img}
            itemName={e?.brand}
            price={e?.price}
            date={new Date(e?.updatedAt).toLocaleDateString("en-GB")}
            adsName={e?.title}
            userName={e?.user?.fullName}
            KM={e?.kiloMeters}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsDrid;
