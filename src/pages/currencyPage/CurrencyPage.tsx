import React, { useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Routing } from '../../constants/routes';
import { CurrencyItem } from "../../interfaces";
import { debounce } from "../../utils/debounce";
import { useAppDispatch } from "../../redux/hooks";
import * as currenciesState from "../../redux/currencyReducer";
import { ListComponent, SearchInput, Heading } from "../../shared";
import "./CurrencyPage.scss";

type CurrencyPageProps = {
  currencies: CurrencyItem[];
  placeholder: string;
  title: string;
  searchTerm: string;
  showConvert?: boolean;
};

export const CurrencyPage: React.FC<CurrencyPageProps> = ({
  currencies,
  placeholder,
  title,
  searchTerm,
  showConvert = false,
}) => {
  const [filteredCurrency, setFilteredCurrency] = useState<CurrencyItem[]>(currencies);
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();

  const currenciesFiltering = (debouncedSearchTerm: string) => {
    if (!debouncedSearchTerm) {
      setFilteredCurrency(currencies);

      return;
    }

    const filteredCurrencies = currencies.filter((currency) => {
      const searchTermLowerCase = debouncedSearchTerm.toLowerCase();
      const currencyLowerCase = currency.name.toLowerCase();

      return currencyLowerCase.includes(searchTermLowerCase);
    });

    setFilteredCurrency(filteredCurrencies);
  };

  const onFilterCurrencies = useMemo(
    () => debounce(currenciesFiltering, 200),
    [currencies]
  );

  const addToFavorites = (item: CurrencyItem) => {
    const selectedCurrencies = currencies.map((favCurrency) => {
      if (favCurrency.name === item.name) {
        return  { ...favCurrency, isSelected: !favCurrency.isSelected }
      }

      return favCurrency;
    });

    const filteredCurrencies = filteredCurrency.map((filterCurrency) => {
      if (filterCurrency.name === item.name) {
        return  { ...filterCurrency, isSelected: !filterCurrency.isSelected }
      }

      return filterCurrency;
    })

    const favorites = selectedCurrencies.filter((item) => item.isSelected);

    dispatch(currenciesState.setFavoriteCurrencies(favorites));
    dispatch(currenciesState.setCurrencies(selectedCurrencies));
    setFilteredCurrency(filteredCurrencies);
  };

  const selectCurrencyToConvert = (currency: CurrencyItem): void => {
    const { name } = currency;

    dispatch(currenciesState.setCurrencyToConvert(name.toUpperCase()));
    navigate(`${Routing.MyCurrencies}/${currency.name}`);
  };

  return (
    <div className="currenciesPageContainer">
      <div className="currenciesSearchWrapper">
        <Heading title={title} />
        <SearchInput
          placeholder={placeholder}
          value={searchTerm}
          onChange={onFilterCurrencies}
        />
      </div>
      {filteredCurrency.length > 0 && (
        <ListComponent
          currencies={filteredCurrency}
          onChange={ showConvert ? selectCurrencyToConvert: addToFavorites }
        />
      )}
    </div>
  );
};
