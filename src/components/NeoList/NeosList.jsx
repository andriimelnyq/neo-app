import { useState, useEffect } from 'react';
import { NeoCard } from '../NeoCard';
import './NeoList.scss';

export const NeosList = ({ initialData }) => {
  const [days, setDays] = useState([]);

  const getDayInfo = (day) => day[1].reduce((acc, currentNeo) => {
    const max_diameter = currentNeo.estimated_diameter.kilometers.estimated_diameter_max
    const distance = currentNeo.close_approach_data[0].miss_distance.kilometers
    const speed = currentNeo.close_approach_data[0].relative_velocity.kilometers_per_hour

    if (acc.max_estimated_diameter < max_diameter) {
      acc.max_estimated_diameter = max_diameter;
    }

    if (currentNeo.is_potentially_hazardous_asteroid) {
      acc.number_of_potentially_hazardous = acc.number_of_potentially_hazardous + 1;
    }

    if (acc.closest_NEO === null) {
      acc.closest_NEO = distance;
    }
    
    if (acc.closest_NEO > distance) {
      acc.closest_NEO = distance;
    }
  
    if (acc.fastest_NEO === null) {
      acc.fastest_NEO = speed;
    }

    if (acc.fastest_NEO > speed) {
      acc.fastest_NEO = speed
    }
    
    return acc
  }, {
      date: day[0],
      max_estimated_diameter: 0,
      number_of_potentially_hazardous: 0,
      closest_NEO: null,
      fastest_NEO: null
  });

  useEffect(() => {
    setDays([getDayInfo(initialData[0])]);
    let currentIndex = 1;

    const parseList = () => {
      const nextDayInfo = getDayInfo(initialData[currentIndex]);
      setDays(prevDays => [...prevDays.slice(-5), nextDayInfo]);
  
      currentIndex = (currentIndex + 1) % initialData.length;
    };

    const interval = setInterval(parseList, 3000);

    return () => clearInterval(interval);
  }, [initialData]);

  return (
    <div className="neos-list">
      {days.map(day => (
      <NeoCard
        key={day.date}
        day={day}
        days={days}
      />
    ))}
    </div>
  )
}