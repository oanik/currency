import React, { useEffect } from "react";

import ThemeProvider from "./context/ThemeProvider";
import { useAppDispatch } from "./redux/hooks";
import { getCurrencies } from "./redux/currencyReducer";
import Header from "./layout/header";
import RoutingPanel from "./layout/routingPanel";
import StateWrapper from './layout/stateWrapper';
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <div className="pagesContainer">
         <StateWrapper >
          <RoutingPanel />
         </StateWrapper>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
