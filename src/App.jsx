import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { getNeosByDate } from './api';
import { NeosList } from './components/NeoList';
import { Loader } from './components/Loader';

function App() {
  const [initialData, setInitialData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadNeos = async () => {
    try {
      setIsLoading(true);
      const dataFromServer = await getNeosByDate();

      const sortedInitialNeos = Object.entries(dataFromServer.near_earth_objects).sort(([dateA], [dateB]) => {
        return new Date(dateA) - new Date(dateB);
      });
    
      setInitialData(sortedInitialNeos);
    } catch {
      setError('Unable to load data. Try again later!')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNeos();
  }, []);

  return (
    <>
      { isLoading
        ? <Loader />
        : (initialData.length > 0 && (<NeosList initialData={initialData} />)) }

      <Snackbar
        open={error !== null}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
