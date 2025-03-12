import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComp from '../../components/NavbarComp';

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
        navigate('/stats');
    };

    return (
        <div className='flex flex-row h-screen w-screen'>
            <NavbarComp/>
            <div className='flex flex-col w-full justify-center items-center px-12'>
                <div class="flex mb-4 w-full">
                    <div class="w-full bg-[#2C368B] text-white font-extrabold h-18 rounded-2xl flex justify-center items-center text-3xl">Pilih Tahun Zakat</div>
                </div>
                <div className="text-white font-extrabold w-full">
                    {years.map((year) => {
                        const hijriYear = year - 579;
                        return (
                            <div key={year} onClick={() => handleClick(hijriYear)} className='my-4 bg-[#03A44D] rounded-2xl flex flex-col justify-between'>
                                <div className='bg-[#2C368B] w-full rounded-t-2xl px-4 py-2 text-xl'>
                                    Tahun
                                </div>
                                <div className='py-4 px-6'>
                                    <div className='text-5xl'>
                                        {hijriYear} H
                                    </div>
                                    <div className='text-2xl font-light'>
                                        {year} M
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;