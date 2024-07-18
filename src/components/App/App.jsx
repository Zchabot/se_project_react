import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [weatherData, setWeather] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    handleCloseMenu();
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onAddItem = (newItem, setIsLoading) => {
    setIsLoading(true);
    addItem(newItem)
      .then((res) => {
        newItem._id = res._id;
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .then(setSubmitSuccess(true))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (deletedItem, setIsLoading) => {
    setIsLoading(true);
    deleteItem(deletedItem._id)
      .then(() => {
        const filteredItems = clothingItems.filter((item) => {
          return item._id !== deletedItem._id;
        });
        setClothingItems(filteredItems);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeather(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            openMenu={openMenu}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  setClothingItems={setClothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  weatherData={weatherData}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
          submitSuccess={submitSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          card={selectedCard}
          handleDeleteClick={handleDeleteClick}
        />
        <ConfirmDeleteModal
          card={selectedCard}
          isOpen={activeModal === "delete"}
          onClose={closeActiveModal}
          handleDeleteItem={handleDeleteItem}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
