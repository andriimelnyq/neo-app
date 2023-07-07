const BASE_URL = 'https://api.nasa.gov';
const API_KEY = import.meta.env.VITE_REACT_APP_NEOS_API_KEY;
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const firstDay = new Date(currentYear, currentMonth - 1, 1);

const formattedFirstDay = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${firstDay.getDate().toString().padStart(2, '0')}`;

const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

export const getNeosByDate = () => {
  return fetch(`${BASE_URL}/neo/rest/v1/feed?start_date=${formattedFirstDay}&end_date=${formattedToday}&api_key=${API_KEY}`)
    .then(res => res.json());
};
