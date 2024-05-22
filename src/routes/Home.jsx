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

function Home() {
  const [Content, setContent] = useState("Home");
  return (
      <React.Fragment>
          <Map>
            <SearchBox /> 
          </Map>
          <ContentBox>
            <Weather />
          </ContentBox>
      </React.Fragment>
  )
}

export default Home