import { call, put, select } from "redux-saga/effects";

import { CurrencyItem } from "../interfaces";
import { getCurrencies } from "../api/currency.api";
import {
  setCurrencies,
  setCurrenciesLoadError,
  setIsCurrenciesLoading,
  selectFavoriteCurrencies,
} from "./currencyReducer";

export function* handleGetCurrencies(): Generator {
  try {
    yield put(setIsCurrenciesLoading(true));
    yield put(setCurrenciesLoadError(""));

    const favoriteCurrenciesList = (yield select(
      selectFavoriteCurrencies
    )) as string[];

    const response = (yield call(getCurrencies)) as any;
    const allCurrencies = Object.entries(response.rates).map(
      ([key, value]) => ({
        name: key,
        value: value,
        isSelected: false,
      })
    ) as CurrencyItem[];

    const updatedData = (yield call(
      updateAllCurrenciesList,
      favoriteCurrenciesList,
      allCurrencies
    )) as CurrencyItem[];
    yield put(setCurrencies(updatedData));
  } catch (err) {
    yield put(setCurrenciesLoadError("Error"));
  } finally {
    yield put(setIsCurrenciesLoading(false));
  }
}

function updateAllCurrenciesList(
  favorites: string[],
  currencies: CurrencyItem[]
): CurrencyItem[] {
  return currencies.map((currency) => {
    const isSelected = favorites.find((item) => item === currency.name);

    return isSelected ? { ...currency, isSelected: true } : currency;
  });
}
