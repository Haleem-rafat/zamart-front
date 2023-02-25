import axios from "axios";
import React from "react";
import api from "../api";
import { useLanguage } from "../context/language-context";
import useAxios from "./use-axios";

const useGetGatogry = () => {
  const [lang] = useLanguage();
  const [GatogryOptions, setGatogryOptions] = React.useState([]);

  const { run, isLoading, error, isError } = useAxios();

  React.useEffect(() => {
    run(axios.get(api.app.viewCategories)).then(({ data }) => {
      const GatogryOptions = data.data;
      const options = [];

      GatogryOptions.forEach((d) =>
        options.push({
          text: lang === "en" ? d?.nameEn : d?.nameAr,
          key: d?._id,
          value: d._id,
        })
      );

      setGatogryOptions(options);
    });
  }, [lang, run]);

  return {
    GatogryOptions,
    setGatogryOptions,
    loadingGatogry: isLoading,
    errorGatogry: error,
    isErrorGatogry: isError,
  };
};

export default useGetGatogry;
