import "./RadioInput.css";

function RadioInput({ id, inputName, value, valuesName, handleChange, text }) {
  return (
    <label
      htmlFor={id}
      className={`radio__label ${
        valuesName === value && "radio__label_checked"
      }`}
    >
      <input
        id={id}
        type="radio"
        className="radio__input"
        name={inputName}
        value={value}
        checked={valuesName === value}
        onChange={handleChange}
        required
      />
      {text}
    </label>
  );
}

export default RadioInput;
