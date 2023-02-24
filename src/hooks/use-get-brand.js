import axios from "axios";
import React from "react";
import api from "../api";
import { useLanguage } from "../context/language-context";
import useAxios from "./use-axios";

const useGetBrand = ({ CatID }) => {
  const [lang] = useLanguage();
  const [BrandOptions, setBrandOptions] = React.useState([]);

  const { run, isLoading, error, isError } = useAxios();

  React.useEffect(() => {
    run(axios.get(api.brand.default(CatID))).then(({ data }) => {
      const BrandOptions = data.data;
      const options = [];

      BrandOptions.forEach((d) =>
        options.push({
          text: d?.name,
          key: d?.name,
          value: d._id,
        })
      );

      setBrandOptions(options);
    });
  }, [lang, run, CatID]);

  return {
    BrandOptions,
    setBrandOptions,
    loadingBrand: isLoading,
    errorBrand: error,
    isErrorBrand: isError,
  };
};

export default useGetBrand;
