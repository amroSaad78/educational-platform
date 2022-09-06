import { useState, memo } from "react";

const FormButtonsList = ({
  resetValue,
  onReset,
  submitValue,
  continueValue,
  onContinue,
}) => {
  const [state, setState] = useState("");
  const toggle = () => {
    state ? setState("") : setState("active");
  };

  const reset = (action) => {
    setState("");
    action();
  };
  return (
    <div className={`form-buttons ${state}`}>
      <ul>
        <li>
          <input type="submit" value={submitValue} />
          <span onClick={toggle} />
        </li>
        <li>
          <input
            type="button"
            value={continueValue}
            onClick={() => reset(onContinue)}
          />
        </li>
        <li>
          <input
            type="button"
            value={resetValue}
            onClick={() => reset(onReset)}
          />
        </li>
      </ul>
    </div>
  );
};

export default memo(FormButtonsList);
