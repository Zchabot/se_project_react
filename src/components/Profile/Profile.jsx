import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  weatherData,
  openProfileModal,
  handleLogOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          weatherData={weatherData}
          openProfileModal={openProfileModal}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing-Items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
