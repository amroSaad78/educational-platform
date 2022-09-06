import { memo } from "react";

const TextField = ({
  error,
  type,
  placeholder,
  name,
  value,
  maxLength,
  autoComplete,
  onChange,
}) => {
  return (
    <div className={`items-field ${value && "active"} ${error && "error"} `}>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        title={name}
        autoComplete={autoComplete}
      />
      <span></span>
      <label>{error ? error : placeholder}</label>
    </div>
  );
};

export default memo(TextField);
