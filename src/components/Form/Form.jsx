import "./Form.css";

function Form({
  title,
  onFormSubmit,
  isValid,
  isLoading,
  loadingButtonText,
  buttonText,
  children,
}) {
  return (
    <>
      <h2 className="form__title">{title}</h2>
      <form
        action=""
        autoComplete="on"
        className="form__element"
        onSubmit={onFormSubmit}
      >
        {children}
        <button className="form__submit" type="submit" disabled={!isValid}>
          {`${isLoading === true ? `${loadingButtonText}` : `${buttonText}`}`}
        </button>
      </form>
    </>
  );
}

export default Form;
