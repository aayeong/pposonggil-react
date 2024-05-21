import React, { useState } from "react";
import styled from "styled-components";

import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import Header from "../layouts/Header";
import Navigation from "../layouts/Navigation";
import WeatherComponent from "../components/Weather";


const ContentBox = styled.div`
  height: 34.5vh;
  max-height: 34.5vh;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  position: relative;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 200;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.15);
`;

const Wrapper = styled.div`
  margin: 70px 0px;
`;

function Home() {
  const [Content, setContent] = useState("Home");
  return (
      <React.Fragment>
        <Header />
        {/* 화면 */}
        <Wrapper id="wrapper">
          <SearchBox /> 
          <Map />
          {/* 지도 하단 info 창  */}
          <ContentBox>
            <WeatherComponent />
          </ContentBox>
        </Wrapper>
       
        <Navigation />
      </React.Fragment>
  )
}

export default Home