import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  const handleClick = (hijriYear) => {
    localStorage.setItem('hijriYear', hijriYear);
    navigate('/zakat-fitrah');
  };

  return (
    <div className="text-red-500">
      <ul>
        {years.map((year) => {
          const hijriYear = year - 579;
          return (
            <li key={year} onClick={() => handleClick(hijriYear)}>
              {year} M / {hijriYear} H
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;