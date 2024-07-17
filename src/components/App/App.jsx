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

  const onAddItem = (evt, newItem) => {
    evt.preventDefault();
    addItem(newItem)
      .then(() => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        evt.target.reset();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (deletedItem) => {
    const filteredItems = clothingItems.filter((item) => {
      return item._id !== deletedItem._id;
    });
    deleteItem(deletedItem._id)
      .then(() => {
        setClothingItems(filteredItems);
        closeActiveModal();
      })
      .catch(console.error);
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
          clothingItems={clothingItems}
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
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
