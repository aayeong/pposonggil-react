import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { addressState, currentAddressState, locationBtnState, routeInfo } from "./atoms";
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

function PlaceInfo() {
  const address = useRecoilValue(addressState);
  const [place, setPlace] = useState("");
  const [depth3, setDepth3] = useState("");
  const navigate = useNavigate();
  const setRouteInfo = useSetRecoilState(routeInfo);
  const currentAddress = useRecoilValue(currentAddressState);
  const locationBtn = useRecoilValue(locationBtnState); 
  const test = useRecoilValue(routeInfo);


  useEffect(() => {
    if(locationBtn) {
      setPlace(currentAddress.addressName);
      setDepth3(currentAddress.depth3);
    } else {
    setPlace(address.roadAddressName);
    setDepth3(address.depth3);
    }
  }, [address, locationBtn]);

  const onStartClick = () => {
    setRouteInfo({ start: place, end: "" });
    navigate('/search');
    console.log("경로 출발지: ", test.start); //test용
    console.log("경로 목적지: ", test.end); //test용
  };

  const onEndClick = () => {
    setRouteInfo({ start: currentAddress.addressName, end: place });
    navigate('/search');
    console.log("경로 출발지: ", test.start); //test용
    console.log("경로 목적지: ", test.end); //test용
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
          <Address><FontAwesomeIcon icon={faLocationDot} style={{color: "#216CFF"}}/> {place}</Address>
          <AddressBox>
            <Info>
              <span style={{ color: "#5f5f5f" }}>
              {/* {marker ? <PlaceInfo /> : <Weather />} */}
                {place} ({depth3})
              </span>
            </Info>
          </AddressBox>
          <AddressBox>
            <Btn onClick={onStartClick}><span style={{ color: "#02C73C" }}>출발</span></Btn>
            <Btn onClick={onEndClick}><span style={{ color: "#216CFF"}}>도착</span></Btn>
          </AddressBox>
        </Box>
        <IconBox>
          <Icon icon={faMagnifyingGlassArrowRight}/>
        </IconBox>
      </Row> 
    </Container>
   );
  }

  export default PlaceInfo