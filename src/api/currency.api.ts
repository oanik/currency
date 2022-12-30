import axios from "axios";

import { CURRENCY_API } from "../constants/endpoints";

export const getCurrencies = (): Promise<any> =>
  axios.get(CURRENCY_API).then(({ data }) => data);
