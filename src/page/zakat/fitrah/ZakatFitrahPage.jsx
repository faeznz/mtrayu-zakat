import React, { useState, useEffect } from "react";
import supabase from "../../../utils/supabaseClient";
import NavbarComp from "../../../components/NavbarComp";

const ZakatFitrahPage = () => {
    const hijriYear = localStorage.getItem("hijriYear");
    const tableName = `${hijriYear}_fitrah`;

    const [data, setData] = useState();
    const [formData, setFormData] = useState({
        nama: "",
        alamat: "Derpoyudan",
        jiwa: "",
        jumlah: "",
        uang: "",
    });
    const [formError, setFormError] = useState(null);

    const fetchData = async () => {
        try {
            const { data, error } = await supabase.from(tableName).select("*");
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setData(data);
            }
        } catch (error) {
            console.error("Unexpected error fetching data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        // Validasi input wajib
        if (!formData.nama || !formData.alamat || !formData.jiwa) {
            setFormError("Nama, Alamat, dan Jiwa wajib diisi.");
            return;
        }

        // Validasi input numerik
        if (formData.jiwa && isNaN(parseInt(formData.jiwa))) {
            setFormError("Jiwa harus berupa angka.");
            return;
        }
        if (formData.jumlah && isNaN(parseInt(formData.jumlah))) {
            setFormError("Jumlah harus berupa angka.");
            return;
        }
        if (formData.uang && isNaN(parseInt(formData.uang))) {
            setFormError("Uang harus berupa angka.");
            return;
        }
        // Ganti nilai kosong dengan 0
        const formDataToSend = {
            ...formData,
            jumlah: formData.jumlah ? formData.jumlah : "0",
            uang: formData.uang ? formData.uang : "0",
        };

        try {
            const { error } = await supabase.from(tableName).insert([formDataToSend]);
            if (error) {
                console.error("Error inserting data:", error);
            } else {
                fetchData();
                setFormData({
                    nama: "",
                    alamat: "Derpoyudan",
                    jiwa: "",
                    jumlah: "",
                    uang: "",
                });
            }
        } catch (error) {
            console.error("Unexpected error inserting data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    },);

    return (
        <div className="flex flex-row w-screen h-screen">
            <NavbarComp />
            <div className="w-full p-12 text-xl text-[#2C368B]">
                <div class="flex mb-4">
                    <div class="w-full bg-[#2C368B] text-white font-extrabold h-24 rounded-2xl flex justify-center items-center text-3xl">Zakat Fitrah Masjid Trayu {hijriYear} H</div>
                </div>

                <div className="flex flex-row">
                    {formError && <p style={{ color: "red" }}>{formError}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 p-8 gap-4">
                        <label htmlFor="nama">Nama:</label>
                        <input
                            type="text"
                            id="nama"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            required
                            className="border-2 rounded-full py-2 px-6"
                        />

                        <label htmlFor="alamat">Alamat:</label>
                        <select
                            id="alamat"
                            value={formData.alamat}
                            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                            required
                            className="border-2 rounded-full py-2 px-6"
                        >
                            <option value="Derpoyudan">Derpoyudan</option>
                            <option value="Kauman">Kauman</option>
                            <option value="Sorobayan">Sorobayan</option>
                        </select>

                        <label htmlFor="jiwa">Jiwa:</label>
                        <input
                            type="number"
                            id="jiwa"
                            value={formData.jiwa}
                            onChange={(e) => setFormData({ ...formData, jiwa: e.target.value })}
                            required
                            className="border-2 rounded-full py-2 px-6"
                        />

                        <label htmlFor="jumlah">Jumlah:</label>
                        <input
                            type="number"
                            id="jumlah"
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                            className="border-2 rounded-full py-2 px-6"
                        />

                        <label htmlFor="uang">Uang:</label>
                        <input
                            type="number"
                            id="uang"
                            value={formData.uang}
                            onChange={(e) => setFormData({ ...formData, uang: e.target.value })}
                            className="border-2 rounded-full py-2 px-6"
                        />

                        <button type="submit" className="rounded-full py-4 mt-4 text-white bg-[#2C368B]" >Tambah</button>
                    </form>

                    <div className="w-1/2 p-8 overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Jiwa</th>
                                    <th>Jumlah</th>
                                    <th>Uang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, index) => ( 
                                    <tr key={index}>
                                        <td>{index + 1}</td> 
                                        <td>{item.nama}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.jiwa}</td>
                                        <td>{item.jumlah}</td>
                                        <td>{item.uang}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZakatFitrahPage;