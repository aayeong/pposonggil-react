import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faSpinner } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const BtnContainer = styled.div`
  width:100%;
  padding: 12px;
  z-index: 100;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
`;

const LocationBtn = styled(motion.button)`
  all: unset;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  font-size: 20px;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  cursor: ${props => (props.isLoading ? 'not-allowed' : 'pointer')};
`;

const LocationIcon = styled(FontAwesomeIcon)`
  color: #216CFF;
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 50vh;
`;

function Map() {
  const [isLocated, setIsLocated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 비동기 작업 상태 관리
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  // 지도 생성
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=fa3cd41b575ec5e015970670e786ea86&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 8,
        };
        mapInstance.current = new kakao.maps.Map(container, options);
      });
    };
  }, []);

  const handleBtnClick = () => {
    setIsLoading(true);
    if (!isLocated) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          mapInstance.current.setCenter(locPosition); // 부드럽게 이동
          mapInstance.current.setLevel(3);

          if (!markerInstance.current) {
            markerInstance.current = new kakao.maps.Marker({
              position: locPosition,
              map: mapInstance.current,
            });
          } else {
            markerInstance.current.setPosition(locPosition);
            markerInstance.current.setMap(mapInstance.current);
          }
          setIsLoading(false);
          setIsLocated(true);
        }, () => {
          alert('위치를 가져올 수 없습니다.');
          setIsLoading(false);
        });
      } else {
        alert('Geolocation을 사용할 수 없습니다.');
        setIsLoading(false);
      }
    } else {
      const seoulPosition = new kakao.maps.LatLng(37.5665, 126.9780);
      mapInstance.current.setCenter(seoulPosition);
      mapInstance.current.setLevel(8);

      if (markerInstance.current) {
        markerInstance.current.setMap(null); // 마커 제거
      }
      setIsLoading(false);
      setIsLocated(false);
    }
  };

  return (
    <MapContainer>
      <KakaoMap id="map" ref={mapRef}>
        <BtnContainer>
          <LocationBtn 
            onClick={ handleBtnClick }
            isLoading={ isLoading }
            initial={{ rotate: 0 }}
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          >
            <LocationIcon 
              icon={isLoading? faSpinner : faLocationCrosshairs}
              style={{color: isLocated? 'tomato' : '#216CFF' }}
            />
          </LocationBtn>
        </BtnContainer>
      </KakaoMap>
    </MapContainer>
  )
}

export default Map;


