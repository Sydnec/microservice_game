// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroList from './components/HeroList';
import Game from './components/Game';
import './styles/Heroes.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
