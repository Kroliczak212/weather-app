/**
 * Przetwarza prognozę godzinową na prognozę dzienną z min/max temperaturą,
 * uwzględniając timezone miasta i dopasowując dane dla lokalnej godziny 12:00.
 * @param {Array} forecastList - Lista prognoz godzinowych.
 * @param {number} timezone - Przesunięcie strefy czasowej w sekundach (z API).
 * @returns {Array} - Lista prognoz dziennych.
 */
export const processDailyForecast = (forecastList, timezone) => {
  if (!Array.isArray(forecastList) || forecastList.length === 0) {
    console.warn("Brak danych prognozy godzinowej do przetworzenia.");
    return [];
  }

  const dailyForecast = {};

  // Funkcja pomocnicza do obliczania lokalnego czasu miasta
  const getLocalDate = (timestamp, timezone) => {
    const utcDate = new Date(timestamp * 1000);
    return new Date(utcDate.getTime() + timezone * 1000);
  };

  forecastList.forEach((entry) => {
    const localDate = getLocalDate(entry.dt, timezone);
    const date = localDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const localHour = localDate.getUTCHours(); 

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        minTemp: entry.main.temp,
        maxTemp: entry.main.temp,
        weather: entry.weather[0].description,
        icon: entry.weather[0].icon,
        closestToNoon: Math.abs(localHour - 12), 
      };
    } else {
      const day = dailyForecast[date];

      day.minTemp = Math.min(day.minTemp, entry.main.temp);
      day.maxTemp = Math.max(day.maxTemp, entry.main.temp);

      // Jeśli godzina jest bliższa 12:00, zaktualizuj opis i ikonę
      const currentDifference = Math.abs(localHour - 12);
      if (currentDifference < day.closestToNoon) {
        day.weather = entry.weather[0].description;
        day.icon = entry.weather[0].icon;
        day.closestToNoon = currentDifference;
      }
    }
  });

  // Konwertuj obiekt dailyForecast na tablicę
  return Object.entries(dailyForecast).map(([date, data]) => {
    const localDate = new Date(date);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[localDate.getUTCDay()];

    return {
      date,
      dayOfWeek,
      minTemp: Math.round(data.minTemp * 10) / 10, // Zaokrąglenie do 1 miejsca po przecinku
      maxTemp: Math.round(data.maxTemp * 10) / 10,
      weather: data.weather,
      icon: data.icon,
    };
  });
};
