// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dungeon from './components/Dungeon';
import Fight from './components/Fight';
import HeroList from './components/HeroList';
import HeroCreation from './components/HeroCreation';
import Game from './components/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/create" element={<HeroCreation />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dungeon" element={<Dungeon />} />
        <Route path="/fight" element={<Fight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
