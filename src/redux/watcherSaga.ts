import { takeLatest } from "redux-saga/effects";

import { getCurrencies } from "./currencyReducer";
import { handleGetCurrencies } from "./currencySaga";

export function* watcherSaga(): Generator {
  yield takeLatest(getCurrencies, handleGetCurrencies);
}
