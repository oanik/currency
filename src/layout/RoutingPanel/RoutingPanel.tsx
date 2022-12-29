import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Routing } from "../../constants/routes";
import { AllCurrenciesPage } from "../../pages/AllCurrenciesPage";
import { MyCurrenciesPage } from "../../pages/MyCurrenciesPage";
import ConvertPage from "../../pages/convertPage";

const NavigateTo: React.FC = () => <Navigate to="/" replace />;

export const RoutingPanel: React.FC = () => {
  const routes = useMemo(() => {
    return [
      {
        path: Routing.Base,
        panel: AllCurrenciesPage,
      },
      {
        path: `${Routing.MyCurrencies}/:id`,
        panel: ConvertPage,
      },
      {
        path: Routing.MyCurrencies,
        panel: MyCurrenciesPage,
      },
      {
        path: "*",
        panel: NavigateTo
      },
    ];
  }, []);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.panel />} />
      ))}
    </Routes>
  );
};
