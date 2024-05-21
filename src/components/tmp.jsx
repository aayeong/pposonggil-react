// import { useRecoilState } from "recoil";
// import { currentAddressAtom } from "./atoms";

// const { kakao } = window;

// function GetAddr(lat,lng){
//   const [currentAddress, setCurrentAddress] = useRecoilState(currentAddressAtom);

//   let geocoder = new kakao.maps.services.Geocoder();
//   let coord = new kakao.maps.LatLng(lat, lng);
//   let callback = function(result, status) {
//       if (status === kakao.maps.services.Status.OK) {
//           console.log(result);
//           console.log(result[0].address.region_2depth_name);  //서초구
//           console.log(result[0].address.region_3depth_name);  //방배동
//           // console.log(result[0].road_address.address_name);  //도로명 주소

//           // setCurrentAddress({ region2DepthName: result })
//       }
//   }
//   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// }

// export default function GetLocation() {
// if (navigator.geolocation) { 
//   navigator.geolocation.getCurrentPosition(function(position) {
//       //getAddr(위도, 경도);
//       GetAddr(position.coords.latitude , position.coords.longitude);
//   }, function(error) {
//     console.error(error);
//   }, {
//     enableHighAccuracy: false,
//     maximumAge: 0,
//     timeout: Infinity
//   });
// } else {
//   alert('현재 브라우저에서는 geolocation를 지원하지 않습니다');
// }
// return
// }

// GetLocation();
// import React, { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { currentAddressAtom } from './atoms';

// const { kakao } = window;

// function GetAddr(lat, lng, setCurrentAddress) {
//   const geocoder = new kakao.maps.services.Geocoder();
//   const coord = new kakao.maps.LatLng(lat, lng);
//   const callback = function(result, status) {
//     if (status === kakao.maps.services.Status.OK) {
//       console.log(result);
//       console.log(result[0].address.region_2depth_name);  // 서초구
//       console.log(result[0].address.region_3depth_name);  // 방배동
//       // setCurrentAddress 상태 업데이트
//       setCurrentAddress({
//         region2DepthName: result[0].address.region_2depth_name,
//         region3DepthName: result[0].address.region_3depth_name,
//       });
//     }
//   };
//   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// }

// export default function GetLocation() {
//   const [currentAddress, setCurrentAddress] = useRecoilState(currentAddressAtom);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         function(position) {
//           GetAddr(position.coords.latitude, position.coords.longitude, setCurrentAddress);
//         },
//         function(error) {
//           console.error(error);
//         },
//         {
//           enableHighAccuracy: false,
//           maximumAge: 0,
//           timeout: Infinity,
//         }
//       );
//     } else {
//       alert('현재 브라우저에서는 geolocation를 지원하지 않습니다');
//     }
//   }, [setCurrentAddress]);

//   return null;
// }

// GetLocation();