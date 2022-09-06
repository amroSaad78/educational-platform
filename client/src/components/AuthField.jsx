import { memo } from "react";

const AuthField = ({
  error,
  type,
  placeholder,
  name,
  value,
  maxLength,
  onChange,
  icon,
}) => {
  return (
    <div className="auth-field">
      <span>{error}</span>
      <input
        type={type}
        name={name}
        value={value}
        autoComplete="new-password"
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <i className={`fas ${icon}`} />
    </div>
  );
};

export default memo(AuthField);
