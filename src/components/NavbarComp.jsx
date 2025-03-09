import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComp = () => {
  return (
    <div className='flex flex-row bg-white text-black justify-between p-4'>
      <Link to="/home" className="p-2">Home</Link>
      <Link to="/zakat-fitrah" className="p-2">Zakat Fitrah</Link>
      <Link to="/zakat-maal" className="p-2">Zakat Maal</Link>
      <Link to="/zakat-fidyah" className="p-2">Zakat Fidyah</Link>
      <Link to="/infaq" className="p-2">Infaq</Link>
    </div>
  );
};

export default NavbarComp;