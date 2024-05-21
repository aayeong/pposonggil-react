import { atom } from "recoil";

// 맵 이동 시 중심 좌표 주소 정보
export const addressState = atom({
  key: "addressState",
  default: { 
    region2: "", //구
    region3: "", //동
  }
});

// 햔재 위치 주소 정보
export const currentAddressState = atom({
  key: "currentAddressState",
  default: { 
    region2: "", //구
    region3: "", //동
    addressName: "", //도로명 주소
  }
})

export const locationBtnState = atom({
  key: "LocationBtnState",
  default: false,
});

