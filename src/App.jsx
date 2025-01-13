import { useState, useEffect } from "react";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import CityInfo from "./components/CityInfo/CityInfo.jsx";
import BasicWeatherInfo from "./components/BasicWeatherInfo/BasicWeatherInfo.jsx";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast.jsx";
import TodayOverview from "./components/TodayOverview/TodayOverview.jsx";
import ChartAndSun from "./components/ChartAndSun/ChartAndSun.jsx";
import { getWeatherByCity } from "./services.jsx";
import { processDailyForecast } from "./utils/weatherUtils.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
    description: "",
    icon: "",
    timestamp: null,
    humidity: "",
    windspeed: "",
    dailyForecast: [],
    pressure: "",
    sunrise: "",
    sunset: "",
    timezone: "",
  });

  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      console.log("Wyszukiwanie miasta:", city);

      const data = await getWeatherByCity(city);
      console.log("Dane z API:", data);

      if (!data.forecast || data.forecast.length === 0) {
        throw new Error("API zwróciło pustą prognozę dla tego miasta.");
      }

      const firstForecast = data.forecast[0];
      const dailyForecast = processDailyForecast(
        data.forecast,
        data.city.timezone
      );

      setWeatherData({
        city: data.city?.name || "Nieznane miasto",
        temperature: firstForecast.main?.temp || "N/A",
        description: firstForecast.weather?.[0]?.description || "Brak opisu",
        icon: firstForecast.weather?.[0]?.icon || "",
        timestamp: firstForecast.dt || null,
        humidity: firstForecast.main?.humidity || "N/A",
        windspeed: firstForecast.wind?.speed || "N/A",
        pressure: firstForecast.main?.pressure || "N/A",
        sunrise: data.city.sunrise || "N/A",
        sunset: data.city.sunset || "N/A",
        timezone: data.city.timezone || "N/A",
        dailyForecast,
      });

      setError(null);
    } catch (err) {
      console.error("Błąd pobierania danych pogodowych:", err.message);
      setError(`Nie udało się pobrać danych pogodowych: ${err.message}`);
    }
  };

  useEffect(() => {
    handleSearch("Tarnów");
  }, []);

  return (
    <div className={styles.appContainer}>
      {/* Panel lewy */}
      <div className={styles.leftPanel}>
        <SearchBar onSearch={handleSearch} />
        <CityInfo
          city={weatherData.city}
          temperature={weatherData.temperature}
          icon={weatherData.icon}
          date={weatherData.dailyForecast?.[0]?.date}
        />
        <BasicWeatherInfo
          description={weatherData.description}
          dailyForecast={weatherData.dailyForecast}
          humidity={weatherData.humidity}
          windspeed={weatherData.windspeed}
          icon={weatherData.icon}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Panel prawy */}
      <div className={styles.rightPanel}>
        <WeeklyForecast dailyForecast={weatherData.dailyForecast} />
        <TodayOverview pressure={weatherData.pressure} />
        <ChartAndSun
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
          timezone={weatherData.timezone}
        />
      </div>
    </div>
  );
}

export default App;
