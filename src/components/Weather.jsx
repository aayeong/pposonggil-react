import React, { useState, useEffect } from "react";
import { addressState, currentAddressState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "341611f95d76874b2e5d207c40a6b07f";

const Container = styled.div`
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 600;
  padding: 12px;
  height: 100%;
  width: 100%;
  display: block;
  justify-content: start;
  align-items: center;
  font-size: 20px;
`;

const WeatherIcon = styled.img`
  width: 90px;
  height: 90px;
  background-color: #b2e5ff;
  border-radius: 50%;
`;

const Box = styled.div`
  border-radius: 22px;
  width: 70%;
  margin: 10px;
  padding: 12px;;
`;

const IconBox = styled(Box)`
  width: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Description = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  &:first-child {
    justify-content: space-between;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0px 8px;

`;

const Hr = styled.hr`
  border: 1px dashed rgba(184, 184, 184, 0.611);
`;

const Address = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Temp = styled.div`
  font-size: 35px;
`;

const FeelTemp = styled.div`
  font-size: 16px;
  margin-top: 5px;
  margin-left: 3px;
  color: #414141;
`;

const WeatherInfo = styled.div`
  font-size:16px;
  margin-right: 15px;
  width: auto;
  background-color: white;
  box-shadow: 0px 0px 5px 3px rgba(109, 109, 109, 0.15);
  padding: 8px 14px;;
  border-radius: 20px;
`;

const TempBox = styled(Box)`
  display: flex;
  width: auto;
  padding: 0px;
  background-color: whitesmoke;
`;

const WindIcon = styled(FontAwesomeIcon)`
  color: #0037a6;
  margin-right: 6px;
`;
const HumidIcon = styled(FontAwesomeIcon)`
  color: #79d9ff;
  margin-right: 6px;
`;

const WeatherBox = styled(Box)`
  box-shadow: 0px 0px 5px 3px rgba(109, 109, 109, 0.15);
  background-color: white;
  width: auto;
`;



export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const address= useRecoilValue(addressState);
  const currentAddress = useRecoilValue(currentAddressState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
  }, []);

  const onGeoSuccess = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const onGeoError = () => {
    setError("Error: 위치 추적을 허용해 주세요.");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const weatherIconCode = weatherData.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  // 기온과 체감 온도를 정수로 반올림
  const roundedTemp = Math.round(weatherData.main.temp);
  const roundedFeelsLike = Math.round(weatherData.main.feels_like);
  
  const roundedTempMax = Math.round(weatherData.main.temp_max);
  const roundedTempMin = Math.round(weatherData.main.temp_min);
  
  return (
    <Container>
      <Row id="address_weather">
        <Box>
          <Address>{currentAddress.region2} {currentAddress.region3}<Icon icon={faLocationArrow} /></Address>
          <Temp>{roundedTemp}°</Temp>
          <FeelTemp>체감 {roundedFeelsLike}°</FeelTemp>
        </Box>
        <IconBox>
          <WeatherIcon src={weatherIconUrl} />
          <Description>{weatherData.weather[0].description}</Description>
        </IconBox>
      </Row>
      <Row id="temperature">
        <TempBox>
          <WeatherInfo><span style={{ color: "tomato" }}>최고</span> {roundedTempMax}°</WeatherInfo>
          <WeatherInfo><span style={{ color: "#216CFF"}}>최저</span> {roundedTempMin}°</WeatherInfo>
        </TempBox>
      </Row>
      <Hr/>
      <Row id="wind_humid">
        <WeatherBox><WindIcon icon={faWind} />풍속 {weatherData.wind.speed}m/s</WeatherBox>
        <WeatherBox><HumidIcon icon={faDroplet} />습도 {weatherData.main.humidity}%</WeatherBox>
      </Row>
      <Row id="wind_humid">
        <WeatherBox>날씨 정보</WeatherBox>
        <WeatherBox>날씨 정보</WeatherBox>
      </Row>
      
    </Container>
    
    
    // <Container>
    //   <Box>{address.region2} {address.region3}</Box>
    //   <Box>
    //     <WeatherImg
    //       className="weather-icon"
    //       src={weatherIconUrl}
    //       alt="Weather Icon"
    //     />
    //   </Box>
    //   <Box className="temp-now">기온 {roundedTemp}°</Box>
    //   <Box>{weatherData.weather[0].description}</Box>
    //   <Box className="temp-feel">체감온도 {roundedFeelsLike}°</Box>
    //   <Box>강수정보</Box>
    //   <Box className="wind">풍속 {weatherData.wind.speed}m/s</Box>
    //   <Box className="humid">습도 {weatherData.main.humidity}%</Box>
    //   <Box>최고 {roundedTempMax}°</Box>
    //    <Box>최저 {roundedTempMin}°</Box>
    //  </Container>
   );
  }