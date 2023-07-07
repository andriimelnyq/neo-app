import { useState, useEffect } from 'react';
import { getNeosByDate } from './api';
import { NeosList } from './components/NeosList';

function App() {
  const [initialData, setInitialData] = useState([]);

  const loadNeos = async () => {
    const dataFromServer = await getNeosByDate();

    const sortedInitialNeos = Object.entries(dataFromServer.near_earth_objects).sort(([dateA], [dateB]) => {
      return new Date(dateA) - new Date(dateB);
    });
  
    setInitialData(sortedInitialNeos);
  };

  useEffect(() => {
    loadNeos();
  }, []);

  return (
    initialData.length > 0 && (<NeosList initialData={initialData} />)
  );
}

export default App;
