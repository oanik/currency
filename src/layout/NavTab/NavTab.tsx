import React from "react";
import { NavLink } from "react-router-dom";

import { NavigationItem } from "../../interfaces/index";
import "./NavTab.scss";

type NavTabProps = {
  navItems: NavigationItem[];
};

export const NavTab: React.FC<NavTabProps> = ({ navItems }) => {
  return (
    <nav>
      <ul className="navPanel">
        {navItems.map((navItem) => (
          <li key={navItem.id} className="navLink">
            <NavLink
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
              })}
              to={navItem.route}
              end
            >
              {navItem.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
