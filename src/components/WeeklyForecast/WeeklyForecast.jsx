import styles from "./WeeklyForecast.module.css";
import DayForecast from "../DayForecast/DayForecast.jsx";

const WeeklyForecast = ({ dailyForecast }) => {

  const todayDate = new Date().toISOString().split("T")[0];

  const nextDaysForecast = dailyForecast.filter((forecast) => forecast.date > todayDate);

  return (
    <div>
      <h2 className={styles.title}>Weekly Forecast</h2>
      <div className={styles.weeklyForecast}>
        {nextDaysForecast.length > 0 ? (
          nextDaysForecast.map((day) => <DayForecast key={day.date} day={day} />)
        ) : (
          <p className={styles.noData}>No forecast available for the upcoming days.</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyForecast;
