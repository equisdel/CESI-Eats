import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndUserWelcomePage from './Pages/WelcomePageContent.tsx';
import UserSettingsProfile from './Pages/User/UserSettingsProfile.tsx'
import UserHomePage from './Pages/User/UserHomePage.tsx'
import DeliverHomePage from './Pages/Delivery/DeliveryHomePage.tsx';
import RestaurantOrderPage from './Pages/Restaurant/RestaurantOrderPage.tsx';
import RestaurantHomePage from './Pages/Restaurant/RestaurantHomePage.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EndUserWelcomePage/>} /> 
        <Route path="/create-account" element={<EndUserWelcomePage />} />
        <Route path="/home_profile" element={<UserSettingsProfile/>} />
        <Route path="/homeUser" element={<UserHomePage/>} />
        <Route path="/homeDelivery" element={<DeliverHomePage />} />
        <Route path="/homeRestaurant" element={<RestaurantHomePage />} />
        <Route path="/restaurant-orders" element={<RestaurantOrderPage />} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;
