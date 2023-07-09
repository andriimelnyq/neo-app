const BASE_URL = 'https://api.nasa.gov';
const API_KEY = import.meta.env.VITE_REACT_APP_NEOS_API_KEY;
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const firstDay = new Date(currentYear, currentMonth - 1, 1);

const formatDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const getNeos = (startDate, endDate) => {
  return fetch(`${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`)
    .then((res) => res.json());
};

export const getNeosByDate = async () => {
  let neos = {};
  let startDate = new Date(firstDay);

  while (startDate <= today) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    if (endDate > today) {
      endDate = today;
    }

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    const response = await getNeos(startDateFormatted, endDateFormatted);
    neos = {
      ...neos,
      ...response,
      near_earth_objects: {
        ...neos.near_earth_objects,
        ...response.near_earth_objects,
      },
    };

    startDate.setDate(startDate.getDate() + 7);
  }

  return neos;
};
