import React from "react";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import ManageSearchSharpIcon from "@mui/icons-material/ManageSearchSharp";
import { styled } from "@mui/material/styles";

import { useAppSelector } from "../../redux/hooks";
import CircularProgressBar from "./CircularProgress";
import DataState from "./DataState";

const IconWrapper = styled("div")(() => ({
  marginBottom: "0.5em"
}));


export const StateWrapper: React.FC = ({ children }) => {
  const isLoading = useAppSelector((state) => state.currency.isCurrenciesLoading);
  const error = useAppSelector((state) => state.currency.currenciesLoadError);
  const currencies = useAppSelector((state) => state.currency.currencies);

  const ErrorComponent = (): React.ReactElement => {
    return (
      <>
        <PetsTwoToneIcon fontSize="medium" color="inherit" />
        <IconWrapper>
          <PetsTwoToneIcon fontSize="medium" color="inherit" />
        </IconWrapper>
      </>
    )
  };

  const renderComponent = (): React.ReactElement => {
    if((currencies.length > 0) && !isLoading && !error) {
      return <>{children}</>;
    } else if(isLoading && !error) {
      return <CircularProgressBar />;
    } else if (!isLoading && error) {
      return (
        <DataState
          text="Oops! Something went wrong ... "
          component={<ErrorComponent />}
        />
      )
    } else {
      return ( 
        <DataState
          text="No data found"
          component={<ManageSearchSharpIcon fontSize="medium" color="inherit" />} 
        />
      )
    }
  }

  return renderComponent();
};
