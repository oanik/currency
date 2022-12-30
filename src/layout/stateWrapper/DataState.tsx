import * as React from 'react';
import { styled } from "@mui/material/styles";

const StateWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
}));

type DataStateComponentProps = {
  text: string;
  component: React.ReactNode;
}

const DataStateComponent: React.FC<DataStateComponentProps> = ({ 
  text,
  component
}) => {
  return (
    <StateWrapper>
      <h3 style={{marginRight: "0.2em"}}>{text}</h3>
      {component}
    </StateWrapper>
  );
}

export default DataStateComponent;
