// src/components/SignUpPage.jsx
import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage('Signup successful! Check your email for verification.');
        setEmail('');
        setPassword('');
        console.log('Signup data:', data);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}} className='bg-[#d8d8d8] w-1/3 font-medium'>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2C368B' }} className='font-extrabold text-2xl'>Sign Up</h2>
        {error && <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#2C368B' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#2C368B' }}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '10px 20px', backgroundColor: '#2C368B', color: 'white', border: 'none', borderRadius: '20px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;