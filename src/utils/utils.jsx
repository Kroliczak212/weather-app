export const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const parsedDate = new Date(date); 
  return daysOfWeek[parsedDate.getUTCDay()]; 
};

/**
 * Formatuje czas uwzględniając przesunięcie strefy czasowej w sekundach.
 * @param {number} timestamp - Czas w sekundach (UNIX).
 * @param {number} timezone - Przesunięcie strefy czasowej w sekundach.
 * @returns {string} - Sformatowany czas w formacie HH:mm.
 */
export const formatTime = (timestamp, timezone) => {
  const localTime = new Date((timestamp + timezone) * 1000); 
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();
  const formattedHours = hours.toString().padStart(2, "0"); 
  const formattedMinutes = minutes.toString().padStart(2, "0"); 

  return `${formattedHours}:${formattedMinutes}`;
};
