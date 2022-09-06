import { memo } from "react";
const Menu = ({ iconClass, number, name }) => {
  return (
    <div className="menu">
      <div className="menu-icon">
        <i className={iconClass}></i>
      </div>
      <div className="menu-title">
        <div className="menu-numbers">{number}</div>
        <div className="menu-name">{name}</div>
      </div>
    </div>
  );
};

export default memo(Menu);
