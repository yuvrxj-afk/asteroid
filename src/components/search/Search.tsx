import { styled, alpha } from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent } from "react";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 10,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

interface searchProps {
  onSearch: (searchId: string) => void;
}

const Search: React.FC<searchProps> = ({ onSearch }) => {
  const [searchId, setSearchId] = React.useState<string>("");
  const [autoFocus,setAutoFocus] = React.useState<boolean>(false)

  const handleSearch = () => {
    onSearch(searchId);
    setSearchId("")
    setAutoFocus(false)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // React.useEffect(()=>)

  {
    return (
      <div>
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
            value={searchId}
            onKeyPress={handleKeyPress}
            autoFocus={autoFocus}
          />
        </SearchBar>
      </div>
    );
  }
};
export default Search;
