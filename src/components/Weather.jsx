import React from "react";
import { addressState } from "./atoms";
import { useRecoilValue } from "recoil";


function WeatherComponent() {
  const address = useRecoilValue(addressState);
  return (
    <div>
      <p> { address.region2 } { address.region3 }</p>
      <p> { address.addressName }</p>
    </div>
  );
}

export default WeatherComponent;
