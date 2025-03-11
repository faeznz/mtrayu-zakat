import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComp = () => {
    return (
        <div className='flex flex-col bg-gradient-to-b from-[#2C368B] to-[#03A44D] text-white justify-around p-4 w-1/5'>
            <div className='font-extrabold text-4xl flex flex-col text-center'>Zakat</div>
            <div className='flex flex-col text-xl font-medium'>
                <Link to="/" className="p-2 hover:text-gray-300">Dashboard</Link>
                <Link to="/stats" className="p-2 hover:text-gray-300">Statistik</Link>
                <Link to="/zakat-fitrah" className="p-2 hover:text-gray-300">Zakat Fitrah</Link>
                <Link to="/zakat-maal" className="p-2 hover:text-gray-300">Zakat Maal</Link>
                <Link to="/zakat-fidyah" className="p-2 hover:text-gray-300">Zakat Fidyah</Link>
                <Link to="/infaq" className="p-2 hover:text-gray-300">Infaq</Link>
            </div>
            <div className='font-medium flex flex-col text-center px-4'>
                <div className='flex flex-row justify-between text-xl px-4'>
                    <div>Setting</div>
                    <div>|</div>
                    <div>Keluar</div>
                </div>
                <div className='text-xs pt-4'>@2025 - TBB Masjid Trayu / faeznz</div>
            </div>
        </div>
    );
};

export default NavbarComp;