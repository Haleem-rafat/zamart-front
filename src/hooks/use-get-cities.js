import axios from "axios";
import React from "react";
import api from "../api";
import { useLanguage } from "../context/language-context";
import useAxios from "./use-axios";

const useGetCities = () => {
  const [lang] = useLanguage();
  const [citiesOptions, setCitiesOptions] = React.useState([]);

  const { run, isLoading, error, isError } = useAxios();

  React.useEffect(() => {
    run(axios.get(api.cities.default)).then(({ data }) => {
      const citiesOptions = data.data;
      const options = [];

      citiesOptions.forEach((d) =>
        options.push({
          text: lang === "en" ? d?.nameEn : d?.nameAr,
          key: d?._id,
          value: d._id,
        })
      );

      setCitiesOptions(options);
    });
  }, [lang, run]);

  return {
    citiesOptions,
    setCitiesOptions,
    loadingcitiesOptions: isLoading,
    errorcitiesOptions: error,
    isErrorcitiesOptions: isError,
  };
};

export default useGetCities;
