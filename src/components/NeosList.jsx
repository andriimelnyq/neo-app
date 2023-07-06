import { useState, useEffect } from 'react';
import { NeoCard } from './NeoCard';
import './NeoList.scss';

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

  return (
    <div className="neos-list">
      {neos.map(neo => (
      <NeoCard
        key={neo[0]}
        neo={neo}
      />
    ))}
    </div>
  )
}