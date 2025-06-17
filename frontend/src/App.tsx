import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHomePage from './Pages//User/UserHomePage.tsx';
import AddItemForm from './Pages/Forms/AddItemForm.tsx';
import AddMenuForm from './Pages/Forms/AddMenuForm.tsx';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHomePage />} /> { /*   <Route path="/restaurant-orders" element={<RestaurantOrderPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/delivery-home" element={<DeliverHomePage />} />

        <Route path="/menus" element={<MenuPage />} />
         <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/referrals" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />*/ }
      </Routes>
    </BrowserRouter>
  );
}
export default App;
/** 
 * 
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!');
    console.log('Form data:', formData);
    
    try {
      console.log('Sending request...');
      const response = await axios.post('http://localhost:8000/api/orders', formData);
      console.log('Response:', response);
      alert('✅ Data sent successfully');
    } catch (err) {
      console.log('Error caught:', err);
      alert('❌ Failed to send data.');
      if (err.response) {
        console.error('Error response:', err.response.status, err.response.data);
      } else {
        console.error(err);
    }
  }
};

return (
  <div>
  <h1>delfina  Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <button type="submit">Submit</button>
        </form>
        </div>
      );
}

export default App;
      */