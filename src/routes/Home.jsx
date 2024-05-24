import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import Weather from "../components/Weather";
import PlaceInfo from "../components/PlaceInfo";
import { useRecoilState } from "recoil";
import { gridState, locationBtnState, markerState } from "../components/atoms";

const ContentBox = styled(motion.div)`
  overflow-x: hidden;
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
  height: 20px;
  padding: 15px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top:0;
  background-color: whitesmoke;
`;

const Bar = styled.div`
  width: 10%;
  height: 6px;
  border-radius: 25px;
  background-color: #d9d9d9;
`;

const MapBox = styled(motion.div)`
  /* width: 100%; */
`;

function Home() {
  const [slideUp, setSlideUp] = useState(false);
  const contentBoxRef = useRef(null);

  const [marker, setMarker] = useRecoilState(markerState);

  const changeHeight = useCallback(() => {
    setSlideUp(prev => !prev);
    if (contentBoxRef.current) {
      contentBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }, [slideUp]);

  return (
    <React.Fragment>
      <MapBox
        layout
        initial={{ height: "70%" }}
        animate={{ height: slideUp ? "55%" : "70%" }}
        transition={{ duration: 0.4 }}
      >
        <Map>
          <SearchBox />
        </Map>
      </MapBox>
      <ContentBox
        layout
        initial={{ height: "30%" }}
        animate={{ height: slideUp ? "45%" : "30%" }}
        transition={{ duration: 0.4 }}
        onClick={changeHeight}
        ref={contentBoxRef}
      >
        <ToggleBar><Bar /></ToggleBar>
        {marker ? <PlaceInfo /> : <Weather />}
      </ContentBox>
    </React.Fragment>
  );
}

export default Home;
