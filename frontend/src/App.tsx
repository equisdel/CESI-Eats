import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndUserWelcomePage from './Pages/Users/WelcomePageContent.tsx';
import UserSettingsProfile from './Pages/Users/UserSettingsProfile.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EndUserWelcomePage/>} />
        <Route path="/create-account" element={<EndUserWelcomePage />} />
        <Route path="/home/profile" element={<UserSettingsProfile/>} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;