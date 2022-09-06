import { NavLink } from "react-router-dom";
import { memo } from "react";

const SideBarLink = ({ iconClass, title, url }) => {
  return (
    <li>
      <NavLink to={url}>
        <span className="side-bar-icon">
          <i className={iconClass}></i>
        </span>
        <span className="side-bar-title">{title}</span>
      </NavLink>
    </li>
  );
};

export default memo(SideBarLink);
