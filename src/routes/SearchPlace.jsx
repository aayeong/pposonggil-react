import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { searchPlace } from "../components/atoms";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faClockRotateLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  padding-bottom: 30px;
  width: 100%;
  z-index: 500;
  background-color:white;
  border-bottom: 10px solid rgba(0,0,0,0.1);
`;

const Container = styled.div`
  width: 100%;
  height: 45px;
  background-color: #e9e9e9;
  /* box-shadow: 0px 0px 5px 4px rgba(109, 109, 109, 0.15); */
  padding: 0px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin: 0px 20px;
`;

const Input = styled(motion.input)`
  text-align: left;
  width: 100%;
  height: 100%;
  font-size: 17px;
  border: none;
  background-color: inherit;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  /* margin: 0px 20px 0px 10px ; */
  cursor: pointer;
  padding: 10px;
  margin-right: 5px;
`;


const ResultContainer = styled.div`
  background-color: whitesmoke;
  /* min-height: 65vh; */
  width: 100%;
  max-height: 90%;
  overflow-y: scroll;
  bottom: 70px;
  left: 0;
  right: 0;
  height: 90%;
`;

const Result = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  height: auto;
  min-height: 45px;
  color: black;
  font-weight: 300;
  font-size: 16px;
  border-bottom: 0.5px solid #aeaeae99;
  background-color: white;
  cursor: pointer;
`;

const PlaceIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 15px;
  height: 15px;
  padding: 8px;
  /* background-color: #a3a3a3; */
  /* background-color: #63CAFF; */
  background-color: #003E5E;
  /* background-color: #216CFF; */
  border-radius: 50%;
`;

const Box = styled.div`
  background-color: #88d5ff35;
  width: 100%;
  height: 45px;
`;

const PlaceName = styled.div`
  margin: 0px 20px;
  font-weight: 500;
`;

function SearchPlace() {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchingStart, setIsSearchingStart] = useState(true);
  // const [shouldSearch, setShouldSearch] = useState(true);

  //검색 장소 저장
  const setSearchPlace = useSetRecoilState(searchPlace);
  const searchPlaceName = useRecoilValue(searchPlace);

  const handleSearch = useCallback(() => {
    if (!inputText) {
      setSearchResults([]);
      return;
    }
    const ps = new kakao.maps.services.Places();
    const keyword = inputText;

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResults([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    });
  }, [inputText]);

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [inputText, handleSearch]);

  const handleResultClick = (placeName) => {
    setSearchPlace(placeName);
    // setSearchResults([]);
    // home화면 content박스 장소 상세설명으로 화면 전환
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    // setIsSearchingStart(true);
  };
  
  return (
    <React.Fragment>
      <SearchContainer>
        <Container>
        <Icon icon={faMagnifyingGlass} />
          <Input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="장소·주소 검색"
          />
        </Container>
      </SearchContainer>

      <ResultContainer>
        {searchResults.map((result) => (
          <Result key={result.id} onClick={() => handleResultClick(result.place_name)}>
            <PlaceIcon icon={faLocationDot} />
            <PlaceName>{result.place_name}</PlaceName>
          </Result>
        ))}
      </ResultContainer>
    </React.Fragment>
  );
}

export default SearchPlace;