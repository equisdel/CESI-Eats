import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndUserWelcomePage from './Pages/WelcomePageContent.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EndUserWelcomePage/>} />
        <Route path="/create-acount" element={<EndUserWelcomePage />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;