import "./Input.css";

function Input({
  id,
  errors,
  labelText,
  preErrorMsgTxt,
  inputName,
  type,
  placeholder,
  values,
  handleChange,
  minLength,
  maxLength,
}) {
  return (
    <label
      htmlFor={id}
      className={`input__label ${errors && "input__label_error"}`}
    >
      {`${labelText}${errors ? `${preErrorMsgTxt}(${errors})` : ""}`}
      <input
        type={type}
        className={`input__element ${errors && "input__element_error"}`}
        id={id}
        placeholder={placeholder}
        value={`${values ? `${values}` : ""}`}
        name={inputName}
        onChange={handleChange}
        autoComplete="on"
        minLength={minLength || ""}
        maxLength={maxLength || ""}
        required
      />
    </label>
  );
}

export default Input;
