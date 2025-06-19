import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndUserWelcomePage from './Pages/Users/WelcomePageContent.tsx';
import UserSettingsProfile from './Pages/Users/UserSettingsProfile.tsx'
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
        <Route path="/homeUser/profile" element={<UserSettingsProfile/>} />
        <Route path="/homeUser" element={<UserHomePage/>} />
        <Route path="/DeliveryUser" element={<DeliverHomePage />} />
        <Route path="/RestaurantUser" element={<RestaurantHomePage />} />
        <Route path="/restaurant-orders" element={<RestaurantOrderPage />} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;
