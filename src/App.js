import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import SearchRoute from './routes/SearchRoute';
import SearchRoutes from './routes/SearchRoutes';
import SearchPlace from './routes/SearchPlace';
import Search from './routes/Search';
import Home from './routes/Home';
import Market from './routes/Market';
import Login from './routes/Login';
import Header from './layouts/Header';
import Navigation from './layouts/Navigation';


const Wrapper = styled.div`
  top: 70px;
  bottom: 70px;
  right:0;
  left:0;
  position: fixed;
`;

function App() {
  return (
    // <React.Fragment>
    <Router>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/search/routes" element={<SearchRoutes />} />
          <Route path="/search/place" element={<SearchPlace />} />
          <Route path="/search" element={<Search />} />
          <Route path="/market" element={<Market />} />
          <Route path="/home" element={<Home />} />
          {/* 로그인 페이지로 수정 필요 */}
          <Route path="/" element={<Home />} />
        </Routes>      
      </Wrapper>
      <Navigation />
    </Router>
    // </React.Fragment>
  );
}

export default App;
