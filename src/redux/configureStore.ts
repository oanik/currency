import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import storage from "redux-persist/lib/storage";

import currencyReducer, {
  CurrencyState,
} from "./currencyReducer";
import { watcherSaga } from "./watcherSaga";

export type RootState = {
  currency: CurrencyState;
};

const reducer = combineReducers({
  currency: currencyReducer,
});

const persistConfig = getPersistConfig({
  key: "root",
  version: 2,
  storage,
  rootReducer: reducer,
  whitelist: ["currency.currencies","currency.favoriteCurrencies"]
});

const persistedReducer = persistReducer<RootState>(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();
export const makeStore = (initialState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(sagaMiddleware),
    preloadedState: initialState,
  });

const store = makeStore();

sagaMiddleware.run(watcherSaga);

export type AppStore = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
