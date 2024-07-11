import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeather] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedRadioButton, setSelectedButton] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [invalidInput, setInvalidInput] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    handleCloseMenu();
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onRadioButtonChange = (evt) => {
    setSelectedButton(evt.target.value);
  };

  const handleInput = (evt) => {
    setInvalidInput(`${evt.target.validity.valid}, ${evt.target.id}`);
    setValidationMessage(evt.target.validationMessage);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeather(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
          openMenu={openMenu}
        />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttnText="Add garment"
        title="New Garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label
          htmlFor="name"
          className={`modal__label ${
            invalidInput === "false, name" && "modal__label_error"
          }`}
        >
          {`Name${
            invalidInput === "false, name" ? `* (${validationMessage})` : ""
          }`}
          <input
            type="text"
            className={`modal__input ${
              invalidInput === "false, name" && "modal__input_error"
            }`}
            id="name"
            placeholder="Name"
            onChange={handleInput}
            required
          />
        </label>
        <label
          htmlFor="imageUrl"
          className={`modal__label ${
            invalidInput === "false, imageUrl" && "modal__label_error"
          }`}
        >
          {`Image${
            invalidInput === "false, imageUrl" ? `* (${validationMessage})` : ""
          }`}
          <input
            type="url"
            className={`modal__input ${
              invalidInput === "false, imageUrl" && "modal__input_error"
            }`}
            id="imageUrl"
            placeholder="Image URL"
            onChange={handleInput}
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot"
            className={`modal__label modal__label_type_radio ${
              selectedRadioButton === "hot" && "modal__label_type_radio_checked"
            }`}
          >
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="radio-button"
              value="hot"
              checked={selectedRadioButton === "hot"}
              onChange={onRadioButtonChange}
              required
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className={`modal__label modal__label_type_radio ${
              selectedRadioButton === "warm" &&
              "modal__label_type_radio_checked"
            }`}
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="radio-button"
              value="warm"
              checked={selectedRadioButton === "warm"}
              onChange={onRadioButtonChange}
              required
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className={`modal__label modal__label_type_radio ${
              selectedRadioButton === "cold" &&
              "modal__label_type_radio_checked"
            }`}
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="radio-button"
              value="cold"
              checked={selectedRadioButton === "cold"}
              onChange={onRadioButtonChange}
              required
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
