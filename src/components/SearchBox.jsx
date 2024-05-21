// 

import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { addressState, locationBtnState } from "./atoms";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
  width: 100%;
  z-index: 100;
  position: absolute;
`;

const Container = styled.div`
  width: 85%;
  height: 45px;
  background-color: whitesmoke;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 0px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding: 12px;
  margin: 0px 12px;
  &:last-child { //버튼 컨테이너
    width: 15%;
    padding: 0px;
    margin-left: 0px;
    justify-content: flex-end;
  }
`;

const Input = styled(motion.input)`
  text-align: left;
  width: 100%;
  height: 100%;
  font-size: 17px;
  border: none;
  background-color: whitesmoke;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0px 20px 0px 10px ;
`;

const Btn = styled.button`
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: skyblue;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
`;

function SearchBox() {
  const address = useRecoilValue(addressState);
  const [locationBtnStateValue, setLocationBtnStateValue] = useRecoilState(locationBtnState);
  const [placeholderText, setPlaceholderText] = useState("장소·주소 검색");

  useEffect(() => {
    if (locationBtnStateValue === true) {
      setPlaceholderText(`${address.region2} ${address.region3}`);
    } else {
      setPlaceholderText("장소·주소 검색");
    }
  }, [locationBtnStateValue, address]);

  const handleChange = (e) => {
    setPlaceholderText(e.target.value);
  };

  return (
    <SearchContainer>
      <Container>
        <Icon icon={faMagnifyingGlass} />
        <AnimatePresence>
          <Input
            type="text"
            onChange={handleChange}
            placeholder={placeholderText}
            key={locationBtnStateValue ? "address" : "search"}
            initial={{ opacity: 0 }} // 초기 상태 설정
            animate={{ opacity: 1 }} // 애니메이션 적용
            transition={{ duration: 0.5 }} // 애니메이션 지속 시간
          />
        </AnimatePresence>
      </Container>

      <Container>
        <Btn>
          길찾기
        </Btn>
      </Container>
    </SearchContainer>
  );
}

export default SearchBox;

