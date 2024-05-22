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
  key: "trackingAddress",
  default: { 
    depth2: "", //구
    depth3: "", //동
    addressName: "", //지번 주소
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

export const navState = atom({
  key: "navState",
  defualt: "weather",
})