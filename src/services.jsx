
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Pobiera współrzędne (lat, lon) na podstawie nazwy miasta za pomocą Weather API.
 * @param {string} city - Nazwa miasta.
 * @returns {Promise<{ lat: number, lon: number }>} - Współrzędne miasta.
 */
const getCityCoordinates = async (city) => {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
    console.log("🔗 Wysyłanie żądania do Weather API (dla współrzędnych):", url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Błąd pobierania współrzędnych: ${response.status} - ${
          errorData.message || "Nieznany błąd"
        }`
      );
    }

    const data = await response.json();
    if (!data.coord) {
      throw new Error("Brak współrzędnych dla podanego miasta.");
    }

    console.log("✅ Wyniki Weather API:", data);

    // Pobieranie współrzędnych i zaokrąglanie do 4 miejsc po przecinku
    const lat = parseFloat(data.coord.lat).toFixed(4);
    const lon = parseFloat(data.coord.lon).toFixed(4);

    console.log(`Skrócone współrzędne: lat=${lat}, lon=${lon}`);
    return { lat, lon };
  } catch (error) {
    console.error("❌ Błąd pobierania współrzędnych miasta:", error.message);
    throw error;
  }
};

/**
 * Pobiera prognozę pogody na podstawie współrzędnych.
 * @param {number} lat - Szerokość geograficzna.
 * @param {number} lon - Długość geograficzna.
 * @returns {Promise<Object>} - Dane prognozy pogody.
 */
const getWeatherByCoordinates = async (lat, lon) => {
  try {
    if (!lat || !lon) {
      throw new Error("Współrzędne nie mogą być puste.");
    }

    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${API_KEY}&units=metric`;
    console.log("🔗 Wysyłanie żądania do Weather API:", url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Błąd pobierania danych pogodowych: ${response.status} - ${
          errorData.message || "Nieznany błąd"
        }`
      );
    }

    const data = await response.json();
    console.log("✅ Otrzymane dane pogodowe:", data);

    if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
      throw new Error("Lista prognoz pogodowych jest pusta.");
    }

    return {
      city: data.city,
      forecast: data.list,
    };
  } catch (error) {
    console.error("❌ Błąd pobierania danych pogodowych:", error.message);
    throw error;
  }
};

/**
 * Pobiera prognozę pogody dla podanego miasta.
 * @param {string} city - Nazwa miasta.
 * @returns {Promise<Object>} - Dane prognozy pogody.
 */
export const getWeatherByCity = async (city) => {
  try {
    const { lat, lon } = await getCityCoordinates(city);
    const weatherData = await getWeatherByCoordinates(lat, lon);
    return weatherData;
  } catch (error) {
    console.error("❌ Błąd pobierania pogody dla miasta:", error.message);
    throw error;
  }
};
