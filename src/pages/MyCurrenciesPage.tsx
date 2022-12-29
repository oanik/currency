import React from "react";

import { useAppSelector } from "../redux/hooks";
import CurrencyPage from "./currencyPage";

export const MyCurrenciesPage: React.FC = () => {
  const currencies = useAppSelector(({ currency }) => {
    return currency.favoriteCurrencies;
  });

  return (
    <>
      {currencies.length > 0 && (
        <CurrencyPage
          placeholder="Search by name"
          title="My currencies"
          searchTerm=""
          currencies={currencies}
          showConvert={true}
        />
      )}
    </>
  )  
};
