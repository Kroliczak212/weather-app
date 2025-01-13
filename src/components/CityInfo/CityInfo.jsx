import styles from "./CityInfo.module.css";
import { allIcons } from "../../utils/weatherIcons"; 
import { getDayOfWeek } from "../../utils/utils";

const WeatherIcon = ({ icon, styles }) => {
  if (!icon || !allIcons[icon]) {
    return <p>Brak ikony dla tej pogody</p>;
  }
  return (
    <img
      src={allIcons[icon]}
      alt="Weather Icon"
      className={styles.weatherIcon}
    />
  );
};

const CityInfo = ({ city, icon, date, temperature }) => {
  if (!city) {
    return <p>Wyszukaj miasto, aby zobaczyć pogodę.</p>;
  }

  return (
    <div className={styles.CityInfo}>
      <WeatherIcon icon={icon} styles={styles} />
      <p className={styles.Temp}>
        {temperature ? `${Math.round(temperature)}°C` : "N/A"}
      </p>
      <div className={styles.Box}>
        <p className={styles.City}>{city}</p>
        <p className={styles.Date}>{getDayOfWeek(date)}</p>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default CityInfo;
