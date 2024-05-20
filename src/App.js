import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Search from './routes/Search';
import Home from './routes/Home';
import Market from './routes/Market';
import Login from './routes/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/market" element={<Market />} />
        <Route path="/home" element={<Home />} />
        {/* 로그인 페이지로 수정 필요 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
