import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { RegisterPage } from './pages/RegisterPage';
import { RestrictedRoutes } from './components/routes/RestrictedRoutes';
import { ShopPage } from './pages/ShopPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<MainPage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Route>
          <Route path="/" element={<RestrictedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
