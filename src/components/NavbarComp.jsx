import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComp = () => {
  return (
    <div className='flex flex-col bg-white text-black justify-around items-center p-4 w-1/5'>
      <Link to="/" className="p-2">Home</Link>
      <Link to="/stats" className="p-2">Statistik</Link>
      <Link to="/zakat-fitrah" className="p-2">Zakat Fitrah</Link>
      <Link to="/zakat-maal" className="p-2">Zakat Maal</Link>
      <Link to="/zakat-fidyah" className="p-2">Zakat Fidyah</Link>
      <Link to="/infaq" className="p-2">Infaq</Link>
    </div>
  );
};

export default NavbarComp;