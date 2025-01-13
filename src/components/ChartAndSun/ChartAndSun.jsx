import styles from "./ChartAndSun.module.css";
import sunriseImg from "../../assets/sunrise.svg";
import sunsetImg from "../../assets/sunset.svg";
import { formatTime } from "../../utils/utils";

const SunEvent = ({ icon, label, time }) => (
  <div className={styles.timeRow}>
    <img className={styles.icon} src={icon} alt={label.toLowerCase()} />
    <div>
      <p className={styles.label}>{label}</p>
      <p className={styles.time}>{time}</p>
    </div>
  </div>
);

const ChartAndSun = ({ sunrise, sunset, timezone}) => {
  const formattedSunrise = formatTime(sunrise, timezone);
  const formattedSunset = formatTime(sunset, timezone);

  return (
    <div className={styles.box}>
      <div className={styles.chartBox}>
        <h2>Precipitation</h2>
      </div>
      <div className={styles.sunriseSunsetBox}>
        <h2 className={styles.title}>Sunrise & Sunset</h2>
        <SunEvent icon={sunriseImg} label="Sunrise" time={formattedSunrise} />
        <SunEvent icon={sunsetImg} label="Sunset" time={formattedSunset} />
      </div>
    </div>
  );
};

export default ChartAndSun;
