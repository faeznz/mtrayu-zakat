import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import NavbarComp from '../components/NavbarComp';

const MustahikPage = () => {
  const hijriYear = localStorage.getItem('hijriYear');
  const tableName = `${hijriYear}_mustahik`;

  const [mustahikData, setMustahikData] = useState();
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    jiwa: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) {
          setError(error);
        } else {
          setMustahikData(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from(tableName).insert([formData]);
      if (error) {
        setError(error);
      } else {
        setFormData({ nama: '', alamat: '', jiwa: '' });
        fetchData();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || error.toString()}</div>;

  return (
    <div>
        <NavbarComp/>
      <h2>Data Mustahik {hijriYear}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
        </label>
        <label>
          Alamat:
          <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
        </label>
        <label>
          Jiwa:
          <input type="number" name="jiwa" value={formData.jiwa} onChange={handleChange} />
        </label>
        <button type="submit">Tambah Mustahik</button>
      </form>

      <ul>
        {mustahikData.map((item) => (
          <li key={item.id}>
            {item.nama} - {item.alamat} - {item.jiwa}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MustahikPage;