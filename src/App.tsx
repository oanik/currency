import React, { useEffect } from "react";

import ThemeProvider from "./context/ThemeProvider";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getCurrencies } from "./redux/currencyReducer";
import Header from "./layout/Header";
import RoutingPanel from "./layout/RoutingPanel";
import { CircularProgressBar } from './shared';
import "./App.scss";

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.currency.isCurrenciesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <div className="pagesContainer">
          {isLoading ? <CircularProgressBar /> : <RoutingPanel />}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
