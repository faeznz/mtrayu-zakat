import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabaseClient';
import NavbarComp from '../../components/NavbarComp';

const StatsPage = () => {
    const hijriYear = localStorage.getItem('hijriYear');
    const tableNames = ['fitrah', 'maal', 'fidyah', 'infaq', 'mustahik'];
    const [dataCounts, setDataCounts] = useState({});
    const [jumlahTotals, setJumlahTotals] = useState({});
    const [uangTotal, setUangTotal] = useState(0);
    const [mustahikStats, setMustahikStats] = useState({});
    const [muzakkiStats, setMuzakkiStats] = useState({});
    const [muzakkiCount, setMuzakkiCount] = useState(0);
    const [mustahikCount, setMustahikCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataCounts = async () => {
            setLoading(true);
            try {
                const counts = {};
                const totals = {};
                let infaqUangTotal = 0;
                let fitrahTotal = 0;
                let maalTotal = 0;
                let fidyahTotal = 0;
                let derpoyudanCount = 0;
                let kaumanCount = 0;
                let sorobayanCount = 0;
                let lainCount = 0;
                let mustahikCount = 0;
                let muzakkiTotal = 0;

                for (const tableName of tableNames) {
                    const fullTableName = `${hijriYear}_${tableName}`;
                    const { count, error, data } = await supabase
                        .from(fullTableName)
                        .select('*', { count: 'exact' });
                    if (error) {
                        throw error;
                    }
                    counts[tableName] = count;

                    if (tableName === 'fitrah') {
                        fitrahTotal = data.reduce((sum, item) => sum + Number(item.jumlah), 0);
                        muzakkiTotal = count;

                        // Menghitung muzakki berdasarkan alamat
                        let muzakkiDerpoyudan = data.filter(item => item.alamat === 'Derpoyudan').length;
                        let muzakkiKauman = data.filter(item => item.alamat === 'Kauman').length;
                        let muzakkiSorobayan = data.filter(item => item.alamat === 'Sorobayan').length;

                        setMuzakkiStats({
                            derpoyudan: muzakkiDerpoyudan,
                            kauman: muzakkiKauman,
                            sorobayan: muzakkiSorobayan,
                        });

                    } else if (tableName === 'maal') {
                        maalTotal = data.reduce((sum, item) => sum + Number(item.jumlah), 0);
                    } else if (tableName === 'fidyah') {
                        fidyahTotal = data.reduce((sum, item) => sum + Number(item.jumlah), 0);
                    }

                    if (['fitrah', 'maal', 'fidyah'].includes(tableName)) {
                        const jumlahTotal = data.reduce((sum, item) => sum + Number(item.jumlah), 0);
                        totals[tableName] = jumlahTotal;
                    }

                    if (tableName === 'infaq') {
                        infaqUangTotal = data.reduce((sum, item) => sum + Number(item.uang), 0);
                    }

                    if (tableName === 'mustahik') {
                        mustahikCount = count;
                        data.forEach(item => {
                            if (item.alamat === 'Derpoyudan') derpoyudanCount++;
                            else if (item.alamat === 'Kauman') kaumanCount++;
                            else if (item.alamat === 'Sorobayan') sorobayanCount++;
                            else lainCount++;
                        });
                    }
                }

                setDataCounts(counts);
                setJumlahTotals(totals);
                setUangTotal(infaqUangTotal);
                setMustahikStats({
                    derpoyudan: derpoyudanCount,
                    kauman: kaumanCount,
                    sorobayan: sorobayanCount,
                    lain: lainCount,
                    total: mustahikCount,
                });
                totals['fitrahTotal'] = fitrahTotal;
                totals['maalTotal'] = maalTotal;
                totals['fidyahTotal'] = fidyahTotal;
                setMuzakkiCount(muzakkiTotal);
                setMustahikCount(mustahikCount);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataCounts();
    }, [hijriYear]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message || error.toString()}</div>;

    return (
        <div className='flex flex-row w-screen h-screen'>
            <NavbarComp />
            <div className='w-full p-12 font-extrabold text-xl'>
                <div class="flex mb-4">
                    <div class="w-full bg-[#2C368B] h-24 rounded-2xl flex justify-center items-center text-3xl">Rekap Zakat Masjid Trayu {hijriYear} H</div>
                </div>
                <div class="flex mb-4">
                    <div class="w-full bg-[#03A44D] h-20 rounded-2xl flex justify-around items-center">
                        <div className='text-5xl'>Total Beras</div>
                        <div className='text-2xl'><span className='text-6xl'>{jumlahTotals.fitrah + jumlahTotals.maal + jumlahTotals.fidyah}</span> Kg</div>
                    </div>
                </div>
                <div class="flex mb-4 gap-4">
                    <div class="w-1/3 bg-[#03A44D] h-32 rounded-2xl flex flex-col justify-center items-center gap-2">
                        <div className='w-full px-8 text-2xl'>Zakat Fitrah</div>
                        <div className='text-2xl'><span className='text-6xl'>{jumlahTotals.fitrahTotal}</span> Kg</div>
                    </div>
                    <div class="w-1/3 bg-[#03A44D] h-32 rounded-2xl flex flex-col justify-center items-center gap-2">
                        <div className='w-full px-8 text-2xl'>Zakat Maal</div>
                        <div className='text-2xl'><span className='text-6xl'>{jumlahTotals.maalTotal}</span> Kg</div>
                    </div>
                    <div class="w-1/3 bg-[#03A44D] h-32 rounded-2xl flex flex-col justify-center items-center gap-2">
                        <div className='w-full px-8 text-2xl'>Zakat Fidyah</div>
                        <div className='text-2xl'><span className='text-6xl'>{jumlahTotals.fidyahTotal}</span> Kg</div>
                    </div>
                </div>
                <div class="flex mb-4 gap-4">
                    <div class="w-1/2 h-12">
                        <div class="flex mb-4 gap-4">
                            <div class="w-1/2 bg-[#03A44D] h-64 rounded-2xl flex flex-col justify-center items-center">
                                <div className='w-full px-8 pb-4 text-2xl'>Muzakki</div>
                                <div className='w-full bg-white text-[#03A44D] text-4xl flex justify-center py-2'>{muzakkiCount}</div>
                                <div className='flex flex-row justify-between w-full px-8 pt-4'>
                                    <div className='font-light'>Derpoyudan</div>
                                    <div>{muzakkiStats.derpoyudan}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='font-light'>Kauman</div>
                                    <div>{muzakkiStats.kauman}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='font-light'>Sorobayan</div>
                                    <div>{muzakkiStats.sorobayan}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='text-[#03A44D]'>Sorobayan</div>
                                    <div></div>
                                </div>
                            </div>
                            <div class="w-1/2 bg-[#03A44D] h-64 rounded-2xl flex flex-col justify-center items-center">
                                <div className='w-full px-8 pb-4 text-2xl'>Mustahik</div>
                                <div className='w-full bg-white text-[#03A44D] text-4xl flex justify-center py-2'>{mustahikCount}</div>
                                <div className='flex flex-row justify-between w-full px-8 pt-4'>
                                    <div className='font-light'>Derpoyudan</div>
                                    <div>{mustahikStats.derpoyudan}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='font-light'>Kauman</div>
                                    <div>{mustahikStats.kauman}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='font-light'>Sorobayan</div>
                                    <div>{mustahikStats.sorobayan}</div>
                                </div>
                                <div className='flex flex-row justify-between w-full px-8'>
                                    <div className='font-light'>Lain</div>
                                    <div>{mustahikStats.lain}</div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#03A44D] h-24 rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className='w-full px-8 text-xl'>Infaq</div>
                            <div className='text-2xl'>Rp. {uangTotal}</div>
                        </div>
                    </div>
                    <div class="w-1/2 bg-[#03A44D] h-92 rounded-2xl flex justify-center items-center">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;