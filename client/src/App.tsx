import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { BGMController } from './components/BGMController';

function App() {
  return (
    <>
      <BGMController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
