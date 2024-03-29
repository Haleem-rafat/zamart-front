import axios from "axios";
import React from "react";
import api from "../api";
import { useLanguage } from "../context/language-context";
import useAxios from "./use-axios";

const useGetModel = ({ brandId }) => {
  const [lang] = useLanguage();
  const [ModelOptions, setModelOptions] = React.useState([]);

  const { run, isLoading, error, isError } = useAxios();

  React.useEffect(() => {
    if (brandId)
      run(axios.get(api.model.default(brandId))).then(({ data }) => {
        const ModelOptions = data.data;
        const options = [];

        ModelOptions.forEach((d) =>
          options.push({
            text: d?.name,
            key: d._id,
            value: d._id,
          })
        );

        setModelOptions(options);
      });
  }, [lang, run, brandId]);

  return {
    ModelOptions,
    setModelOptions,
    loadingModel: isLoading,
    errorModel: error,
    isErrorModel: isError,
  };
};

export default useGetModel;
