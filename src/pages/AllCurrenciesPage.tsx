import React from "react";

import { useAppSelector } from "../redux/hooks";
import CurrencyPage from "./currencyPage";

export const AllCurrenciesPage: React.FC = () => {
  const currencies = useAppSelector((state) => state.currency.currencies);

  return (
    <>
      {currencies.length > 0 && (
        <CurrencyPage
          placeholder="Search by name"
          title="All currencies"
          searchTerm=""
          currencies={currencies}
          showConvert={false}
        />
      )}
    </>
  );
};
