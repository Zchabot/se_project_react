import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import randomize from "../../assets/randomize.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  setClothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const randomizeItems = () => {
    const newClothingItems = clothingItems.slice();
    const randomItems = newClothingItems.sort(() => Math.random() - 0.5);
    setClothingItems(randomItems);
  };

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
        <button
          type="button"
          className="cards__randomize-button"
          onClick={randomizeItems}
        >
          <img
            src={randomize}
            alt="&#8635;"
            className="cards__randomize-image"
          />{" "}
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
