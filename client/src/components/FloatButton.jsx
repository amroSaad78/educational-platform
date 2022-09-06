import { NavLink } from "react-router-dom";
import { memo } from "react";

const FloatButton = ({ url, icon }) => {
  return (
    <NavLink to={url}>
      <div className="float-btn">
        <i className={icon}></i>
      </div>
    </NavLink>
  );
};

export default memo(FloatButton);
