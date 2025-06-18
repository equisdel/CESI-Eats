import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantHomePage from './Pages/Restaurant/RestaurantHomePage.tsx';
import RestaurantOrderPage from './Pages/Restaurant/RestaurantOrderPage.tsx';
import UserHomePage from './Pages//User/UserHomePage.tsx';
import DeliverHomePage from './Pages/Delivery/DeliveryHomePage.tsx';
import MenuPage from './Pages/Restaurant/MenuPage.tsx';

/*import AnalyticsPage from './Pages/AnalyticsPage';
import ReferralPage from './Pages/ReferralPage';
import ProfilePage from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage';*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantHomePage />} />
        <Route path="/restaurant-home" element={<RestaurantHomePage />} />
        <Route path="/restaurant-orders" element={<RestaurantOrderPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/delivery-home" element={<DeliverHomePage />} />

        <Route path="/menus" element={<MenuPage />} />
        { /* <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/referrals" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />*/ }
      </Routes>
    </BrowserRouter>
  );
}
export default App;