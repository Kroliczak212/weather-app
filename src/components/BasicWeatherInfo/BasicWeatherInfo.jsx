import styles from "./BasicWeatherInfo.module.css";
import { renderWeatherIcon } from "../../utils/weatherIconsSmall.jsx";
import { PiThermometerCold, PiThermometerLight } from "react-icons/pi";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const BasicWeatherInfo = ({
  description,
  dailyForecast,
  humidity,
  windspeed,
  icon,
}) => {
  
  const firstDayForecast = dailyForecast?.[0] || {};

  return (
    <>
      <div className={styles.Basic}>
        <p>
          {renderWeatherIcon(icon, styles)} {description}
        </p>
        <p>
          <PiThermometerCold /> Min Temperature {firstDayForecast.minTemp}°C
        </p>
        <p>
          <PiThermometerLight /> Max Temperature {firstDayForecast.maxTemp}°C
        </p>
      </div>
      <div className={styles.detailBox}>
        <div className={styles.detail}>
          <WiHumidity className={styles.icon} />
          <div>
            <p className={styles.value}>{humidity}%</p>
            <p className={styles.label}>Humidity</p>
          </div>
        </div>
        <div className={styles.detail}>
          <WiStrongWind className={styles.icon} />
          <div>
            <p className={styles.value}>{windspeed} km/h</p>
            <p className={styles.label}>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicWeatherInfo;
