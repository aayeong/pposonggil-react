import { atom } from "recoil";

export const addressState = atom({
  key: "addressState",
  default: { 
    region2: "", //구
    region3: "", //동
    addressName: "", //도로명 주소
  }
});

export const locationBtnState = atom({
  key: "LocationBtnState",
  default: false,
});

