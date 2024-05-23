import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import Weather from "../components/Weather";

const ContentBox = styled(motion.div)`
  overflow-y: scroll;
  display: box;
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

const ToggleBar = styled.div`
  width: 100%;
  height: 6px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  width: 10%;
  height: 6px;
  border-radius: 25px;
  background-color: #d9d9d9;
`;

const MapBox = styled(motion.div)`
  width: 100%;
`;

function Home() {
  const [slideUp, setSlideUp] = useState(true);

  const changeHeight = useCallback(() => {
    setSlideUp(prev => !prev);
  }, []);

  return (
    <React.Fragment>
      <MapBox
        layout
        initial={{ height: "80%" }}
        animate={{ height: slideUp ? "60%" : "80%" }}
        transition={{ duration: 0.3 }}
      >
        <Map>
          <SearchBox />
        </Map>
      </MapBox>
      <ContentBox
        layout
        initial={{ height: "20%" }}
        animate={{ height: slideUp ? "40%" : "20%" }}
        transition={{ duration: 0.3 }}
        onClick={changeHeight}
      >
        <ToggleBar><Bar /></ToggleBar>
        <Weather />
      </ContentBox>
    </React.Fragment>
  );
}

export default Home;
