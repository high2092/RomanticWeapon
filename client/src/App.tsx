import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { RegisterPage } from './pages/RegisterPage';
import { RestrictedRoutes } from './components/routes/RestrictedRoutes';
import { ShopPage } from './pages/ShopPage';
import { InventoryPage } from './pages/InventoryPage';
import { RankingPage } from './pages/RankingPage';
import { DungeonPage } from './pages/DungeonPage';
import { MapPage } from './pages/MapPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<MainPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/dungeon/*" element={<DungeonPage />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
          <Route path="/" element={<RestrictedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
