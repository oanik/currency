import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrencyItem } from "../interfaces";
import { RootState } from "./configureStore";

export interface CurrencyState {
  currencies: CurrencyItem[];
  currencyToConvert: string;
  favoriteCurrencies: CurrencyItem[];
  currenciesLoadError: Error | string;
  isCurrenciesLoading: boolean;
}

export const initialState: CurrencyState = {
  currencies: [],
  currencyToConvert: "",
  favoriteCurrencies: [],
  currenciesLoadError: "",
  isCurrenciesLoading: false,
};

const currencyReducer = createSlice({
  name: "currency",
  initialState,
  reducers: {
    getCurrencies: (): void => {},
    setCurrencies: (
      state,
      { payload }: PayloadAction<CurrencyItem[]>
    ): void => {
      state.currencies = payload;
    },
    setFavoriteCurrencies: (
      state,
      { payload }: PayloadAction<CurrencyItem[]>
    ): void => {
      state.favoriteCurrencies = payload;
    },
    setCurrenciesLoadError: (
      state,
      { payload }: PayloadAction<Error | string>
    ): void => {
      state.currenciesLoadError = payload;
    },
    setIsCurrenciesLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ): void => {
      state.isCurrenciesLoading = payload;
    },
    setCurrencyToConvert: (state, { payload }: PayloadAction<string>): void => {
      state.currencyToConvert = payload;
    },
  },
});

export const selectAllCurrency = (state: RootState): CurrencyItem[] => {
  const { currencies } = state.currency;

  return currencies;
};

export const selectFavoriteCurrencies = (state: RootState): string[] => {
  const { favoriteCurrencies } = state.currency;

  return favoriteCurrencies.map(({ name }) => name);
};

export const selectCurrencyToConvert = (state: RootState): string => {
  const { currencyToConvert } = state.currency;

  return currencyToConvert;
};

export const {
  getCurrencies,
  setCurrencies,
  setFavoriteCurrencies,
  setCurrenciesLoadError,
  setIsCurrenciesLoading,
  setCurrencyToConvert,
} = currencyReducer.actions;

export default currencyReducer.reducer;
