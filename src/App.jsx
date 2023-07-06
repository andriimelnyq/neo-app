import { useState, useEffect } from 'react';
import { getNeosByDate } from './api';
import { NeosList } from './components/NeosList';

function App() {
  const [initialNeos, setInitialNeos] = useState([]);

  const loadNeos = async () => {
    const neosFromServer = await getNeosByDate();

    const sortedInitialNeos = Object.entries(neosFromServer.near_earth_objects).sort(([dateA], [dateB]) => {
      return new Date(dateA) - new Date(dateB);
    });
  
    setInitialNeos(sortedInitialNeos);
  };

  useEffect(() => {
    loadNeos();
  }, []);

  return (
    initialNeos.length > 0 && (<NeosList initialNeos={initialNeos} />)
  );
}

export default App;
