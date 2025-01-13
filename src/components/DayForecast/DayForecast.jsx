import styles from "./DayForecast.module.css";
import { allIcons } from "../../utils/weatherIcons";
import { getDayOfWeek } from "../../utils/utils";

const DayForecast = ({ day }) => {
  const { date, minTemp, maxTemp, weather, icon } = day;
  const dayOfWeek = getDayOfWeek(date);

  const dayIconKey = icon ? icon.replace(/n$/, "d") : null;
  const dayIcon = dayIconKey && allIcons[dayIconKey] ? allIcons[dayIconKey] : null;

  return (
    <div className={styles.dayForecast}>
      <p className={styles.dayOfWeek}>{dayOfWeek}</p>
      {icon && allIcons[icon] ? (
        <img
          src={dayIcon}
          alt={weather}
          className={styles.weatherIcon}
        />
      ) : (
        <p>Brak ikony</p>
      )}
      <p className={styles.temperature}>
        {Math.round(maxTemp)}°C / {Math.round(minTemp)}°C
      </p>
    </div>
  );
};

export default DayForecast;
