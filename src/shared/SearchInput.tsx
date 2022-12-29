import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  height: "38px",
  width: "50%",
  alignItems: "center",
  marginLeft: 0,
  border: "2px solid #dddddd",
  borderRadius: "2px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: "2px solid #465159",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 5, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

type SearchInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  placeholder = "",
  onChange,
}) => {
  const [searchString, setSearchString] = useState<string>(value);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event?.target as HTMLInputElement;

    onChange(value);
    setSearchString(value);
  };
  return (
    <Search>
      <StyledInputBase
        placeholder={placeholder}
        value={searchString}
        onChange={onInputChange}
        inputProps={{ "aria-label": "search" }}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchInput;
