import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { addressState, currentAddressState, locationBtnState, routeInfoState, searchPlace } from "./atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";


const Container = styled(motion.div)`
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 600;
  padding: 12px;
  padding-top: 6px;
  height: 100%;
  width: 100%;
  display: block;
  justify-content: start;
  align-items: center;
  font-size: 20px;
`;

const Box = styled.div`
  border-radius: 22px;
  width: 80%;
  margin: 20px;
  padding: 12px;;
`;

const IconBox = styled(Box)`
  width: 20%;
  justify-content: center;
  align-items: center;
  text-align: center;

`;

const Row = styled.div`
  display: flex;
  &:first-child {
    justify-content: space-between;
    background-color: white;
    box-shadow: 0px 0px 10px 3px rgba(109, 109, 109, 0.1);
    border-radius: 25px;
    margin: 0px 10px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 25px;
  height: 25px;
  padding: 20px;
  background-color: #003E5E;
  border-radius: 50%;
  color: white;
`;

const Address = styled.div`
  font-size: 22px;
  font-weight: 700;
`;


const Info = styled.div`
  font-size:16px;
  margin-right: 15px;
  width: auto;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Btn = styled(Info)`
  background-color: white;
  width: auto;
  padding: 8px 24px;
  border-radius: 25px;
  text-align: center;
  border: 0.5px solid #00000039;
  box-shadow: 0px 0px 5px 3px rgba(109, 109, 109, 0.15);
  font-weight: 700;
  margin-bottom: 0;
  cursor: pointer;
`;

const AddressBox = styled.div`
  display: flex;
  width: auto;
  margin-top: 15px;
`;

function Test() {
  const [activeLoc, setActiveLoc] = useState(true);

  const address = useRecoilValue(addressState);
  // const [place, setPlace] = useState(""); //마크업된 장소
  const [depth3, setDepth3] = useState("");

  const currentAddress = useRecoilValue(currentAddressState);
  const locationBtn = useRecoilValue(locationBtnState); 
  // const test = useRecoilValue(routeInfo);

  // 수정내용
  const navigate = useNavigate();

  const place = useRecoilValue(searchPlace);
  const [routeInfo, setRouteInfo] = useRecoilState(routeInfoState);


  // useEffect(() => {
  //   if(locationBtn) {
  //     setPlace(currentAddress.addressName);
  //     setDepth3(currentAddress.depth3);
  //   } else {
  //   setPlace(address.roadAddressName);
  //   setDepth3(address.depth3);
  //   }
  // }, [address, locationBtn]);

  // const onOriginClick = () => {
  //   // setRouteInfo({ start: place, end: "" });
  //   navigate('/search/routes');

  //   const updateOrigin = () => {
  //     const newOrigin = {
  //       name: place.place_name,
  //       lat: place.lat,
  //       lon: place.lon,
  //     };
  
  //     setRouteInfo((prevState) => ({
  //       ...prevState,
  //       origin: [newOrigin],
  //     }));
  //   };
  // };

  // const onDestClick = () => {
  //   // setRouteInfo({ start: currentAddress.addressName, end: place });
  //   const updateDestination = () => {
  //     const newDestination = {
  //       name: place.place_name,
  //       lat: place.lat,
  //       lon: place.lon,
  //     };
  
  //     setRouteInfo((prevState) => ({
  //       ...prevState,
  //       destination: [newDestination],
  //     }));
  //   navigate('/search/routes');

  //   };
  // };

  const onOriginClick = () => {
    const newOrigin = {
      name: place.place_name,
      lat: place.lat,
      lon: place.lon,
    };

    setRouteInfo((prevState) => ({
      ...prevState,
      origin: [newOrigin],
    }));

    navigate('/search/routes');
  };

  const onDestClick = () => {
    const newDestination = {
      name: place.place_name,
      lat: place.lat,
      lon: place.lon,
    };

    setRouteInfo((prevState) => ({
      ...prevState,
      destination: [newDestination],
    }));

    navigate('/search/routes');
  };

  return (
    <Container 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Row id="address_weather">
        <Box>
          <Address>
            <FontAwesomeIcon icon={faLocationDot} style={{color: "#216CFF"}}/> 
            {place.place_name}
          </Address>
          <AddressBox>
            <Info>
              <span style={{ color: "#5f5f5f" }}>
                장소명: {place.place_name} <br/>
                카테고리: {place?.category_group_name} <br/>
                지번: {place.address_name} <br/>
                도로명: {place.road_address_name} <br/>
                전화번호: {place?.phone} <br/>
                위도: {place.lat} <br/>
                경도: {place.lon}
              </span>
            </Info>
          </AddressBox>

          <AddressBox>
            <Btn onClick={onOriginClick}><span style={{ color: "#02C73C" }}>출발</span></Btn>
            <Btn onClick={onDestClick}><span style={{ color: "#216CFF"}}>도착</span></Btn>
          </AddressBox>
        </Box>
        <IconBox>
          <Icon icon={faMagnifyingGlassArrowRight}/>
        </IconBox>
      </Row> 
    </Container>
   );
  }

  export default Test;
