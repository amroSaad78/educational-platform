import { memo } from "react";
import { Roles } from "../config/userRoles";

const OptionsField = ({ error, placeholder, name, value, onChange }) => {
  return (
    <div className={`items-field ${value && "active"} ${error && "error"} `}>
      <select name={name} onChange={onChange} value={value} title="Roles">
        <option value=""></option>
        <option value={Roles.TRAINEE}>مُتدرب</option>
        <option value={Roles.INSTRUCTOR}>مُدرب</option>
        <option value={Roles.ADMIN}>مُشرف عام</option>
      </select>
      <span></span>
      <label>{error ? error : placeholder}</label>
    </div>
  );
};

export default memo(OptionsField);
