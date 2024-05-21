import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addressState, currentAddressState, locationBtnState } from './atoms';

import styled from "styled-components";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faSpinner, faBorderAll } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const BtnContainer = styled.div`
  width: 100%;
  padding: 0px 12px 12px 12px;
  z-index: 100;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  bottom: 0;
  right: 0;
`;

const LocationBtn = styled(motion.button)`
  all: unset;
  margin-top: 12px;
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

const GridBtn = styled(LocationBtn)`
  font-size: 23px;
  cursor: ${props => (props.isGridLoading ? 'not-allowed' : 'pointer')};
`;

const Icon = styled(FontAwesomeIcon)`
  color: #216CFF;
  transition: color 0.2s ease;
`;

const KakaoMap = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
`;

function Map() {
  const [isLocated, setIsLocated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setLocationBtnState = useSetRecoilState(locationBtnState);

  const [grid, setGrid] = useState(false);
  const [isGridLoading, setIsGridLoading] = useState(false);

  const [address, setAddress] = useRecoilState(addressState);
  const [currentAddress, setCurrentAddress] = useRecoilState(currentAddressState);
  const [detailedAddress, setDetailedAddress] = useState('');

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const geocoder = useRef(null);

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
        geocoder.current = new kakao.maps.services.Geocoder();

        // 현재 위치 정보 출력
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lon);
            // 좌표를 주소로 변환
            geocoder.current.coord2Address(lon, lat, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                setCurrentAddress({
                  region2: result[0].address.region_2depth_name,
                  region3: result[0].address.region_3depth_name,
                  addressName: result[0].address.address_name,
                });
              }
            });
          });
        }
        // 지도 이동 이벤트 리스너 등록
        kakao.maps.event.addListener(mapInstance.current, 'idle', () => {
          searchAddrFromCoords(mapInstance.current.getCenter(), displayCenterInfo);
        });

        // 지도 클릭 이벤트 리스너 등록
        kakao.maps.event.addListener(mapInstance.current, 'click', (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          searchDetailAddrFromCoords(latlng, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const detailAddr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
              if (markerInstance.current) {
                markerInstance.current.setMap(null);
              }
              if(result[0].road_address) { // 도로명 주소 있는 경우에만 지도 마크업
                markerInstance.current = new kakao.maps.Marker({
                  position: latlng,
                  map: mapInstance.current,
                });
                setDetailedAddress(detailAddr);
                setIsLocated(false); //지도 클릭해서 마크업 시 현재위치 버튼 비활성화
                mapInstance.current.panTo(latlng); //마커 위치 중심으로 지도 중심 변경
              }
            }
          });
        });

      });
    };
  }, []);

  const searchAddrFromCoords = useCallback((coords, callback) => {
    geocoder.current.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }, []);

  const searchDetailAddrFromCoords = useCallback((coords, callback) => {
    geocoder.current.coord2Address(coords.getLng(), coords.getLat(), callback);
  }, []);

  const displayCenterInfo = useCallback((result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].region_type === 'H') {
          setAddress({
            region2: result[i].region_2depth_name,
            region3: result[i].region_3depth_name,
            addressName: result[i].address_name
          });
          break;
        }
      }
    }
  }, [setAddress]);

  const handleLocationBtn = useCallback(() => {
    
    setIsLoading(true);
    if (!isLocated) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          mapInstance.current.setCenter(locPosition);
          mapInstance.current.setLevel(2);
          setLocationBtnState(true);

          if (!markerInstance.current) {
            markerInstance.current = new kakao.maps.Marker({
              position: locPosition,
              map: mapInstance.current,
            });
          } else {
            markerInstance.current.setPosition(locPosition);
            markerInstance.current.setMap(mapInstance.current);
          }

          geocoder.current.coord2Address(lon, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              for (let i = 0; i < result.length; i++) {
                if (result[i].region_type === 'H') {
                  setCurrentAddress({
                    region2: result[i].region_2depth_name,
                    region3: result[i].region_3depth_name,
                    addressName: result[i].address_name
                  });
                  setDetailedAddress(result[i].address_name);
                  break;
                }
              }
            }
          });

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
        markerInstance.current.setMap(null);
      }
      setLocationBtnState(false);
      setIsLoading(false);
      setIsLocated(false);
      setDetailedAddress('');
    }
  }, [isLocated, setLocationBtnState, setCurrentAddress]);

  const handleGridBtn = useCallback(() => {
    setGrid(prev => !prev);
    if (grid) {
      // setIsGridLoading(true);
      // showGrid 함수 호출
      // setIsGridLoading(false);
    }
  }, [grid]);

  console.log(detailedAddress); //detailedAddress에 지도 클릭한 위치 상세 주소 정보 담겨있음 이걸로 하단창 장소 정보 구현하면 될 듯

  return (
    <KakaoMap id="map" ref={mapRef}>
      <BtnContainer>
        <GridBtn
          id="grid"
          onClick={handleGridBtn}
          isGridLoading={isGridLoading}
        >
          <Icon
            icon={isGridLoading ? faSpinner : faBorderAll}
            style={{ color: grid ? 'tomato' : '#216CFF' }}
          />
        </GridBtn>

        <LocationBtn
          id="location"
          onClick={handleLocationBtn}
          isLoading={isLoading}
          initial={{ rotate: 0 }}
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
        >
          <Icon
            icon={isLoading ? faSpinner : faLocationCrosshairs}
            style={{ color: isLocated ? 'tomato' : '#216CFF' }}
          />
        </LocationBtn>
      </BtnContainer>
    </KakaoMap>
  );
}

export default Map;



