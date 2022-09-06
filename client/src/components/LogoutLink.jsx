import { logout } from "../actions/logoutActions";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memo } from "react";

const LogoutLink = ({ iconClass, title, url }) => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <li>
      <NavLink onClick={handleLogout} to={url}>
        <span className="side-bar-icon">
          <i className={iconClass}></i>
        </span>
        <span className="side-bar-title">{title}</span>
      </NavLink>
    </li>
  );
};

export default memo(LogoutLink);
