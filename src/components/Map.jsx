// import React, { useState, useEffect, useRef } from 'react';
// import { useRecoilState, useSetRecoilState } from 'recoil';
// import { addressState, locationBtnState } from './atoms';

// import styled from "styled-components";
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationCrosshairs, faSpinner, faBorderAll } from "@fortawesome/free-solid-svg-icons";

// const { kakao } = window;

// const BtnContainer = styled.div`
//   width:100%;
//   padding: 0px 12px 12px 12px;
//   z-index: 100;
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: flex-end;
//   bottom: 0;
//   right: 0;
// `;

// const LocationBtn = styled(motion.button)`
//   all: unset;
//   margin-top: 12px;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   border-radius: 50%;
//   background-color: white;
//   padding: 10px;
//   font-size: 20px;
//   box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
//   cursor: ${props => (props.isLoading ? 'not-allowed' : 'pointer')};
// `;

// const GridBtn = styled(LocationBtn)`
//   font-size: 23px;
//   cursor: ${props => (props.isGridLoading ? 'not-allowed' : 'pointer')};
// `;

// const Icon = styled(FontAwesomeIcon)`
//   color: #216CFF;
// `;

// const KakaoMap = styled.div`
//   position: relative;
//   width: 100%;
//   height: 50vh;
// `;

// function Map() {
//   const [isLocated, setIsLocated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const setLocationBtnState = useSetRecoilState(locationBtnState);

//   const [grid, setGrid] = useState(true);
//   const [isGridLoading, setIsGridLoading] = useState(false);

//   const [address, setAddress] = useRecoilState(addressState);

//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerInstance = useRef(null);
//   const geocoder = useRef(null);
  
//   // 지도 생성
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=fa3cd41b575ec5e015970670e786ea86&autoload=false";
//     document.head.appendChild(script);

//     script.onload = () => {
//       kakao.maps.load(() => {
//         const container = mapRef.current;
//         const options = {
//           center: new kakao.maps.LatLng(37.5665, 126.9780),
//           level: 8,
//         };
//         mapInstance.current = new kakao.maps.Map(container, options);
//         geocoder.current = new kakao.maps.services.Geocoder();

//         // 현재 위치 정보 출력
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition((position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             const locPosition = new kakao.maps.LatLng(lat, lon);
//             // 좌표를 주소로 변환
//             geocoder.current.coord2Address(lon, lat, (result, status) => {
//               if (status === kakao.maps.services.Status.OK) {
//                 setAddress({ 
//                   region2: result[0].address.region_2depth_name, 
//                   region3: result[0].address.region_3depth_name,
//                   addressName: ""
//                 });
//               }
//             });
//           });
//         }

//       });
//     };
//   }, []);

//   const handleLocationBtn = () => {
//     setIsLoading(true);
//     if (!isLocated) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const lat = position.coords.latitude;
//           const lon = position.coords.longitude;
//           const locPosition = new kakao.maps.LatLng(lat, lon);

//           mapInstance.current.setCenter(locPosition);
//           mapInstance.current.setLevel(3);

//           if (!markerInstance.current) {
//             markerInstance.current = new kakao.maps.Marker({
//               position: locPosition,
//               map: mapInstance.current,
//             });
//           } else {
//             markerInstance.current.setPosition(locPosition);
//             markerInstance.current.setMap(mapInstance.current);
//             setLocationBtnState(prev => !prev);
//           }

//           // 좌표를 주소로 변환
//           geocoder.current.coord2Address(lon, lat, (result, status) => {
//             if (status === kakao.maps.services.Status.OK) {
//               setAddress({ 
//                 region2: result[0].address.region_2depth_name, 
//                 region3: result[0].address.region_3depth_name,
//                 addressName: result[0].address.address_name,  
//               });
//             }
//           });

//           setIsLoading(false);
//           setIsLocated(true);
//         }, () => {
//           alert('위치를 가져올 수 없습니다.');
//           setIsLoading(false);
//         });
//       } else {
//         alert('Geolocation을 사용할 수 없습니다.');
//         setIsLoading(false);
//       }
//     } else {
//       const seoulPosition = new kakao.maps.LatLng(37.5665, 126.9780);
//       mapInstance.current.setCenter(seoulPosition);
//       mapInstance.current.setLevel(8);

//       if (markerInstance.current) {
//         markerInstance.current.setMap(null); // 마커 제거
//       }
//       setLocationBtnState(prev => !prev);
//       setIsLoading(false);
//       setIsLocated(false);
//     }
//   };

//   const handleGridBtn = () => {
//     setGrid(prev => !prev);
//     if(grid) {
//       //setIsGirdLoading(true);
//       //showGrid 함수 호출
//       //setIsGridLoading(false);
//     }
//   };

//   return (
//     <KakaoMap id="map" ref={mapRef}>
//       <BtnContainer>
//         <GridBtn 
//           id="grid"
//           onClick={ handleGridBtn }
//           isGridLoading={ isGridLoading }
//          >
//           <Icon 
//             icon={ isGridLoading ? faSpinner : faBorderAll }
//             style={{ color: grid ? 'tomato' : '#216CFF' }}
//           />
//         </GridBtn>
          
//         <LocationBtn 
//           id="location"
//           onClick={ handleLocationBtn }
//           isLoading={ isLoading }
//           initial={{ rotate: 0 }}
//           animate={{ rotate: isLoading ? 360 : 0 }}
//           transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
//         >
//           <Icon 
//             icon={ isLoading ? faSpinner : faLocationCrosshairs }
//             style={{ color: isLocated ? 'tomato' : '#216CFF' }}
//           />
//         </LocationBtn>
//       </BtnContainer>
//     </KakaoMap>
//   )
// }

// export default Map;

import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addressState, locationBtnState } from './atoms';

import styled from "styled-components";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faSpinner, faBorderAll } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const BtnContainer = styled.div`
  width:100%;
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

  const [grid, setGrid] = useState(true);
  const [isGridLoading, setIsGridLoading] = useState(false);

  const [address, setAddress] = useRecoilState(addressState);

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
                setAddress({ 
                  region2: result[0].address.region_2depth_name, 
                  region3: result[0].address.region_3depth_name,
                  addressName: ""
                });
              }
            });
          });
        }

        // 지도 이동 이벤트 리스너 등록
        kakao.maps.event.addListener(mapInstance.current, 'idle', () => {
          searchAddrFromCoords(mapInstance.current.getCenter(), displayCenterInfo);
        });
      });
    };
  }, [setAddress]);

  const searchAddrFromCoords = (coords, callback) => {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.current.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  };

  const searchDetailAddrFromCoords = (coords, callback) => {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.current.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  const displayCenterInfo = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      for (let i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
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
  };

  const handleLocationBtn = () => {
    setIsLoading(true);
    if (!isLocated) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          mapInstance.current.setCenter(locPosition);
          mapInstance.current.setLevel(3);

          if (!markerInstance.current) {
            markerInstance.current = new kakao.maps.Marker({
              position: locPosition,
              map: mapInstance.current,
            });
          } else {
            markerInstance.current.setPosition(locPosition);
            markerInstance.current.setMap(mapInstance.current);
            setLocationBtnState(prev => !prev);
          }

          // 좌표를 주소로 변환
          geocoder.current.coord2Address(lon, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setAddress({ 
                region2: result[0].address.region_2depth_name, 
                region3: result[0].address.region_3depth_name,
                addressName: result[0].address.address_name,  
              });
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
        markerInstance.current.setMap(null); // 마커 제거
      }
      setLocationBtnState(prev => !prev);
      setIsLoading(false);
      setIsLocated(false);
    }
  };

  const handleGridBtn = () => {
    setGrid(prev => !prev);
    if(grid) {
      //setIsGirdLoading(true);
      //showGrid 함수 호출
      //setIsGridLoading(false);
    }
  };

  return (
    <KakaoMap id="map" ref={mapRef}>
      <BtnContainer>
        <GridBtn 
          id="grid"
          onClick={ handleGridBtn }
          isGridLoading={ isGridLoading }
         >
          <Icon 
            icon={ isGridLoading ? faSpinner : faBorderAll }
            style={{ color: grid ? 'tomato' : '#216CFF' }}
          />
        </GridBtn>
          
        <LocationBtn 
          id="location"
          onClick={ handleLocationBtn }
          isLoading={ isLoading }
          initial={{ rotate: 0 }}
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
        >
          <Icon 
            icon={ isLoading ? faSpinner : faLocationCrosshairs }
            style={{ color: isLocated ? 'tomato' : '#216CFF' }}
          />
        </LocationBtn>
      </BtnContainer>
    </KakaoMap>
  )
}

export default Map;


