import axios from "axios";

import { CONVERT_API } from "../constants/endpoints";
import { ConvertParams } from "../interfaces";

export const getConvertedData = (params: ConvertParams): Promise<number> => {
  const { currency, amount } = params;

  return axios
    .get(CONVERT_API, { params: { from: currency, to: "USD", amount: amount }})
    .then(({ data }) => data.result);
};
