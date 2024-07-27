import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ weatherData, openProfileModal, handleLogOut }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { userData, hasAvatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <p className="sidebar__date-time">
        {currentDate}, {weatherData.city}
      </p>
      <img
        className={`sidebar__avatar ${
          hasAvatar === false && "sidebar__avatar_hidden"
        }`}
        src={userData.avatar}
        alt={userData.name}
      />
      <div
        className={`sidebar__avatar-default ${
          hasAvatar === true && "sidebar__avatar-default_hidden"
        }`}
      >
        {userData.name.slice(0, 1)}
      </div>
      <p className="sidebar__username">{userData.name}</p>
      <button
        type="button"
        className="sidebar__change-profile-info"
        onClick={openProfileModal}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__log-out" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
