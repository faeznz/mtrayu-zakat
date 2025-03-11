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
        <NavbarComp/>
    <div>
      <h2>Statistik Data {hijriYear}</h2>
      <ul>
        <li>Total Beras: {jumlahTotals.fitrah + jumlahTotals.maal + jumlahTotals.fidyah} Kg</li>
        <li>Zakat Fitrah: {jumlahTotals.fitrahTotal} Kg</li>
        <li>Zakat Maal {jumlahTotals.maalTotal} Kg</li>
        <li>Zakat Fidyah: {jumlahTotals.fidyahTotal} Kg</li>
        <li>Total muzakki: {muzakkiCount}</li>
        <li>Muzakki Derpoyudan: {muzakkiStats.derpoyudan}</li>
        <li>Muzakki Kauman: {muzakkiStats.kauman}</li>
        <li>Muzakki Sorobayan: {muzakkiStats.sorobayan}</li>
        <li>Total mustahik: {mustahikStats.total}</li>
        <li>Mustahik Derpoyudan: {mustahikStats.derpoyudan}</li>
        <li>Mustahik Kauman: {mustahikStats.kauman}</li>
        <li>Mustahik Sorobayan: {mustahikStats.sorobayan}</li>
        <li>Mustahik lain: {mustahikStats.lain}</li>
        <li>Total uang infaq: Rp.{uangTotal}</li>
      </ul>
    </div>
    </div>
  );
};

export default StatsPage;