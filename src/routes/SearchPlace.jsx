import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addressState, currentAddressState, gridState, locationBtnState, mapCenterState, markerState, searchPlace } from '../components/atoms';

import styled from "styled-components";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faSpinner, faX } from "@fortawesome/free-solid-svg-icons";

import SearchBox from '../components/SearchBox';
import Map2 from '../components/Map2';
import PlaceInfo from '../components/PlaceInfo';
import { useNavigate } from 'react-router-dom';
import Test from '../components/test';

const MapWrapper = styled.div`
  height: 55%;
  position: relative;
`;

const ContentBoxWrapper = styled.div`
  height: 35%;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.15);
  z-index: 200;
  bottom: 70px;
  position: sticky;
  overflow-y: scroll;
  background-color: whitesmoke;
`;

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
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top:0;
  margin-bottom: 5px;
  background-color: whitesmoke;
`;

const Bar = styled.div`
  width: 10%;
  height: 6px;
  border-radius: 25px;
  background-color: #d9d9d9;
`;

const SearchBoxWrapper = styled.div`
  width:100%;
  height: 10%;
  padding: 20px;
  display:flex;
  justify-content: center;
  align-items:center;
  background-color: white;
  position: sticky;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 200;
`;

const Input = styled.input`
  text-align: left;
  width: 90%;
  height: 45px;
  font-size: 20px;
  font-weight: 500;
  border: none;
  border-radius:15px;
  padding: 0px 20px;
  margin-right: 10px;
  background-color: whitesmoke;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  padding: 10px;
  font-size: 28px;
`;

function SearchPlace() {

  const [place, setPlace] = useRecoilState(searchPlace);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <SearchBoxWrapper>
        <Input 
          id="searchPlace"
          value={place.place_name} 
          placeholder="장소 주소 검색"
          onClick={()=>navigate("/search")}
          readOnly

        />
        <Icon icon={faX} onClick={()=>navigate("/")}></Icon>
      </SearchBoxWrapper>
      <MapWrapper>
        <Map2 />  
      </MapWrapper>
      <ContentBoxWrapper>
        <ToggleBar><Bar /></ToggleBar>
        {/* <PlaceInfo />  // 하단창 실험 용으로 잠시 Test로 바꿔놓음*/}
        <Test></Test> 
      </ContentBoxWrapper>
    </React.Fragment>
  );
}

export default SearchPlace;



