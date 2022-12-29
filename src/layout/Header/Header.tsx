import React, { useState, useContext, useCallback } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import ThemeContext from "../../context/ThemeContext";
import { Routing } from "../../constants/routes";
import { Theme } from "../../constants/variables";
import NavTab from "../NavTab";
import "./Header.scss";

export const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isTheme, setIsTheme] = useState<boolean>(theme === Theme.DarkTheme);

  const navItems = [
    {
      id: 1,
      title: "All Currencies",
      route: Routing.Base,
    },
    { 
      id: 2, 
      title: "My Currencies",
      route: Routing.MyCurrencies 
    },
  ];

  const switchTheme = (): void => {
    const newTheme = theme === Theme.LightTheme ? Theme.DarkTheme :  Theme.LightTheme;

    setIsTheme(!isTheme);
    setTheme(newTheme);
  };

  const snow = useCallback((): React.ReactNode => {
    let animationDelay = "0s";
    let fontSize = "100px";

    return Array(255).fill(0).map((_el, i) => {
      animationDelay = `${(Math.random() * 16).toFixed(2)}s`;
      fontSize = `${Math.floor(Math.random() * 10) + 10}px`;
      
      const style = {
        animationDelay,
        fontSize,
      };

      return(
        <p
          key={i}
          className="snowFlake"
          id={`item${i}`} 
          style={style}
        >
          *
        </p>
      )
    });
  }, []);

  return (
    <div className="navContainer">
      <div className="snowFlakeContainer">
        {snow()}
      </div>
      <NavTab navItems={navItems} />
      <div className="themeSwitchWrapper">
        <div className="themeSwitchText">Light theme</div>
        <FormControlLabel
          sx={{
            display: "block",
            marginLeft: "16px",
          }}
          control={
            <Switch
              checked={isTheme}
              onChange={switchTheme}
              name="theme-switch"
              color="default"
            />
          }
          label=""
        />
        <div className="themeSwitchText">Dark theme</div>
      </div>
    </div>
  );
};
