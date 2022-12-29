import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import _isNaN from "lodash/isNaN";

import { CurrencyItem } from "../../interfaces";
import { Routing } from "../../constants/routes";
import { debounce } from '../../utils/debounce';
import { getConvertedData } from "../../api/convert.api";
import { useAppSelector } from "../../redux/hooks";
import {
  setCurrencyToConvert,
  selectAllCurrency,
  selectCurrencyToConvert,
} from "../../redux/currencyReducer";
import { Heading } from "../../shared";
import "./ConvertPage.scss";

export const ConvertPage: React.FC = () => {
  const currencyToConvert = useAppSelector(selectCurrencyToConvert);
  const allCurrencies = useAppSelector(selectAllCurrency);

  const [amount, setAmount] = useState<number>(0);
  const [exchangedAmount, setExchangedAmount] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  const convertFromCurrency = currencyToConvert.toUpperCase();

  const validateCurrencyId = (
    id: string,
    allCurrencies: CurrencyItem[]
  ): boolean => {
    return allCurrencies.some((currency) => currency.name === id);
  };

  const convertCurrency = async (amount: number): Promise<void> => {
    if (!currencyToConvert) return;

    if (!amount) {
      setExchangedAmount("");

      return;
    }

    const result = await getConvertedData({
      currency: currencyToConvert,
      amount,
    });
    setExchangedAmount(String(result));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    
    if (_isNaN(Number(value))) {
      return;
    }

    setAmount(Number(value));
    onInputDebounce(Number(value));
  };

  const onInputDebounce = useMemo(() => debounce(convertCurrency, 300), [exchangedAmount]);

  useEffect(() => {
    if (!validateCurrencyId(id, allCurrencies) || !currencyToConvert) {
      navigate(Routing.Base);
    }

    return () => {
      setCurrencyToConvert("");
    };
  }, []);

  return (
    <div className="currenciesPageContainer">
      <Heading title={convertFromCurrency} />
      <div className="convertContainer">
        <div className="inputContainer">
          <label className="label">{convertFromCurrency}</label>
          <input
            className="convertInput"
            placeholder="0"
            autoFocus
            value={amount}
            onChange={onInputChange}
          />
        </div>

        <div className="inputContainer">
          <label className="label">USD</label>
          <input 
            className={classNames("convertInput", "disabledOutline")}
            value={exchangedAmount}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
