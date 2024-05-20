import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../layouts/Header";
import Navigation from "../layouts/Navigation";


const Main = styled.main`
  margin: 70px 0px;
  height: 100vh;
  background-color: skyblue;
`;

function Market() {
  return (
    <React.Fragment>
      <Header />
      <Main>
        <div>
          Hello!
        </div>
      </Main>

      <Navigation />
  </React.Fragment>
  )
}

export default Market