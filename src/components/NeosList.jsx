import { useState, useEffect } from 'react';

export const NeosList = ({ initialNeos }) => {
  const [neos, setNeos] = useState([]);

  useEffect(() => {
    let currentIndex = 1;
    setNeos([initialNeos[0]]);

    const parseList = () => {
      setNeos((prevNeos) => [...prevNeos, initialNeos[currentIndex]].slice(-6));
      if (currentIndex === initialNeos.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }

    const interval = setInterval(parseList, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log(neos);

  return (
    <div>List</div>
  )
}