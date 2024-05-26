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
    addr: "", //지번 주소(도로명 없는 경우도 있어서 지번으로)
    roadAddr: "",
    lat: "",
    lon: "",
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


//검색 장소 정보 저장 atom
// 위경도 필수!!
export const searchPlace = atom({
  key: "searchPlace",
  default: {
    place_name: "",
    category_group_name: "",
    address_name: "",
    road_address_name: "",
    phone: "",
    lat: "",
    lon: "",
  }
})

// 마커에 해당하는 장소, 위치, 상세정보, 위도, 경도 값 저장 atom
export const markLocInfo = atom({
  key: "searchLoc",
  default: {
    place_name: "",
    category_group_name: "",
    address_name: "",
    road_address_name: "",
    phone: "",
    lat: "",
    lon: "",
  }
})
// 현재 위치에 해당하는 장소, 위치, 상세정보, 위도, 경도 값 저장 atom
export const myLocInfo = atom({
  key: "myLoc",
  default: {
    place_name: "",
    category_group_name: "",
    address_name: "",
    road_address_name: "",
    phone: "",
    lat: "",
    lon: "",
    depth2: "",
    depth3: "",
  }
})


//경로의 출발지 도착지 저장 atom
export const routeInfo = atom({
  key: 'routeInfo',
  default: {
    origin: [{ 
      name: '숭실대학교 정보과학관', 
      lat: '', 
      lon: '',
     }],
    destination: [{ 
      name: '', 
      lat: '', 
      lon: '',
    }]
  }
});


//Map2 experimental atom
export const routeInfoState = atom({
  key: 'routeInfo',
  default: {
    origin: [{ 
      name: '출발 장소명', 
      lat: '', 
      lon: '',
    }],
    destination: [{ 
      name: '도착 장소명', 
      lat: '', 
      lon: '',
    }]
  }
});
