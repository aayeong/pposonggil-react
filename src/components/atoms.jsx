import { atom } from "recoil";

//맵 중심 위치 주소 정보
export const mapCenterState = atom({
  key: "mapCenter",
  default: {
    depth2: "", //구
    depth3: "", //동
  }
})

// 클릭 위치 주소 정보 (도로명 주소 있는 곳만 클릭 가능하게 해놔서 도로명 주소 저장)
export const addressState = atom({
  key: "clickedAddress",
  default: { 
    depth2: "", //구
    depth3: "", //동
    roadAddressName: "", //도로명 주소
  }
});

// 햔재 위치 주소 정보
export const currentAddressState = atom({
  key: "currentAddress",
  default: { 
    depth2: "", //구
    depth3: "", //동
    addressName: "", //지번 주소(도로명 없는 경우도 있어서 지번으로)
  }
})

//현재 위치 추적 버튼 활성화 상태 추적 atom
export const locationBtnState = atom({
  key: "LocationBtnState",
  default: false,
});

//마커 활성화 상태 추적 atom
export const markerState = atom({
  key: "markerState",
  default: false,
});

// 격자 활성화 상태 추적 atom
export const gridState = atom({
  key: "gridState",
  default: true,
})

//현재 네비게이션 위치 상태 추적 atom
export const navState = atom({
  key: "navState",
  default: "home",
})

//경로의 출발지 도착지 저장 atom
export const routeInfo = atom({
  key: "routeInfo",
  default: {
    start: "",
    end: "",
  }
})

//검색 장소 저장 atom
export const searchPlace = atom({
  key: "searchPlace",
  default: "",
})