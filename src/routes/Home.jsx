import React, { useState } from "react";
import styled from "styled-components";

import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import Header from "../layouts/Header";
import Navigation from "../layouts/Navigation";
import Weather from "../components/Weather";


const ContentBox = styled.div`
  height: 30vh;
  min-height:35vh;
  max-height: 30vh;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  position: sticky;
  bottom: 70px;
  left: 0;
  right: 0;
  z-index: 200;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.15);
`;

const Wrapper = styled.div`
  top: 70px;
  bottom: 70px;
  right:0;
  left:0;
  position: fixed;
`;

function Home() {
  const [Content, setContent] = useState("Home");
  return (
      <React.Fragment>
        <Header />
        {/* 화면 */}
        <Wrapper id="mapWrapper"> 
          <Map>
            <SearchBox /> 
          </Map>
          {/* 지도 하단 info 창  */}
          <ContentBox>
            <Weather />
          </ContentBox>
        </Wrapper>
        
        <Navigation />
      </React.Fragment>
  )
}

export default Home