import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import Header from "../layouts/Header";
import Navigation from "../layouts/Navigation";

const Wrapper = styled.div`
  margin: 70px 0px;
`;

function Search() {
  return (
    <React.Fragment>
      <Header />
        <Wrapper> 
          <div>Search 화면</div>
        </Wrapper>
      <Navigation />
    </React.Fragment>
  )
}

export default Search