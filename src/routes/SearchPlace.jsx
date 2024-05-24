// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { searchPlace } from "../components/atoms";

// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faLocationDot, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

// const { kakao } = window;

// const SearchContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px 0px;
//   padding-bottom: 30px;
//   width: 100%;
//   z-index: 500;
//   background-color: white;
//   border-bottom: 10px solid rgba(0, 0, 0, 0.1);
// `;

// const Container = styled.div`
//   width: 100%;
//   height: 45px;
//   background-color: #e9e9e9;
//   padding: 0px 20px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   border-radius: 15px;
//   border: 0.1px solid rgba(0, 0, 0, 0.1);
//   padding: 12px;
//   margin: 0px 20px;
// `;

// const Input = styled(motion.input)`
//   text-align: left;
//   width: 100%;
//   height: 100%;
//   font-size: 17px;
//   border: none;
//   background-color: inherit;
//   &:focus {
//     outline: none;
//   }
// `;

// const Icon = styled(FontAwesomeIcon)`
//   cursor: pointer;
//   padding: 10px;
//   margin-right: 5px;
// `;

// const ResultContainer = styled.div`
//   background-color: whitesmoke;
//   width: 100%;
//   max-height: 90%;
//   overflow-y: scroll;
//   bottom: 70px;
//   left: 0;
//   right: 0;
//   height: 90%;
// `;

// const ResultItem = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 10px 20px;
//   height: auto;
//   min-height: 45px;
//   color: black;
//   font-weight: 300;
//   font-size: 16px;
//   border-bottom: 0.5px solid #aeaeae99;
//   background-color: white;
//   cursor: pointer;
// `;

// const PlaceIcon = styled(FontAwesomeIcon)`
//   color: white;
//   width: 15px;
//   height: 15px;
//   padding: 8px;
//   background-color: #003E5E;
//   border-radius: 50%;
// `;

// const HistoryIcon = styled(PlaceIcon)`
//   background-color: gray;
// `; 

// const PlaceName = styled.div`
//   margin: 0px 20px;
//   font-weight: 500;
// `;

// function SearchPlace() {
//   const [inputText, setInputText] = useState(""); // 검색 입력 텍스트
//   const [searchResults, setSearchResults] = useState([]); // 검색 결과(자동완성 기능)
//   const [selectedResult, setSelectedResult] = useState(null); // 선택한 검색 결과
//   const [searchHistory, setSearchHistory] = useState([]); // 검색 기록(로컬스토리지)
  
//   const setSearchPlace = useSetRecoilState(searchPlace); // 선택한 장소명 atom으로 관리
//   // const previousSearches = useRecoilValue(searchPlace);

//   // Kakao Maps API를 이용한 검색 함수
//   const handleSearch = useCallback(() => {
//     if (!inputText) {
//       setSearchResults([]);
//       return;
//     }
//     const ps = new kakao.maps.services.Places();
//     const keyword = inputText;

//     ps.keywordSearch(keyword, (data, status, pagination) => {
//       if (status === kakao.maps.services.Status.OK) {
//         setSearchResults(data);
//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         setSearchResults([]);
//       } else if (status === kakao.maps.services.Status.ERROR) {
//         alert("검색 결과 중 오류가 발생했습니다.");
//       }
//     });
//   }, [inputText]);

//   // 검색 입력 텍스트 변경 시 딜레이를 두고 검색 수행
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       handleSearch();
//     }, 200); // 300ms 딜레이

//     return () => clearTimeout(delayDebounceFn);
//   }, [inputText, handleSearch]);

//   // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 검색 기록 불러오기
//   useEffect(() => {
//     const savedHistory = localStorage.getItem("searchHistory");
//     if (savedHistory) {
//       setSearchHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   // 검색 결과 클릭 시 장소명 로컬스토리지에 저장 및 searchPlace atom 값 업데이트
//   const handleResultClick = (placeName) => {
//     setSearchPlace(placeName);
//     const newHistory = [placeName, ...searchHistory.filter(item => item !== placeName)];
//     setSearchHistory(newHistory);
//     localStorage.setItem("searchHistory", JSON.stringify(newHistory));
//     setSelectedResult(placeName);
//   };

//   // 입력 텍스트 변경 핸들러
//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   // 검색 결과가 없을 때 로컬스토리지의 검색 기록을 표시
//   const resultsToShow = searchResults.length > 0 ? searchResults : searchHistory;

//   return (
//     <React.Fragment>
//       <SearchContainer>
//         <Container>
//           <Icon icon={faMagnifyingGlass} />
//           <Input
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
//             placeholder="장소·주소 검색"
//           />
//         </Container>
//       </SearchContainer>

//       <ResultContainer>
//         {resultsToShow.map((result, index) => (
//           <ResultItem 
//             key={index} 
//             onClick={() => handleResultClick(result.place_name || result)}
//           >
//             {searchResults.length > 0 ? (
//               <PlaceIcon icon={faLocationDot} />
//             ) : (
//               <HistoryIcon icon={faClockRotateLeft} />
//             )}
//             <PlaceName>{result.place_name || result}</PlaceName>
//           </ResultItem>
//         ))}
//       </ResultContainer>
//     </React.Fragment>
//   );
// }

// export default SearchPlace;


import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchPlace } from "../components/atoms";

import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationDot, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  padding-bottom: 30px;
  width: 100%;
  z-index: 500;
  background-color: white;
  border-bottom: 10px solid rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  width: 100%;
  height: 45px;
  background-color: #e9e9e9;
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
  cursor: pointer;
  padding: 10px;
  margin-right: 5px;
`;

const ResultContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  max-height: 90%;
  overflow-y: scroll;
  bottom: 70px;
  left: 0;
  right: 0;
  height: 90%;
`;

const ResultItem = styled.div`
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
  background-color: ${(props) => (props.selected ? "#d3d3d378" : "white")}; /* 배경색 변경 */
  transition: background-color 0.4s ease; /* 부드러운 배경색 변경을 위한 트랜지션 */
  cursor: pointer;

`;

const PlaceIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 15px;
  height: 15px;
  padding: 8px;
  background-color: #003E5E;
  border-radius: 50%;
`;

const HistoryIcon = styled(PlaceIcon)`
  background-color: gray;
`; 

const PlaceName = styled.div`
  margin: 0px 20px;
  font-weight: 500;
`;

function SearchPlace() {
  const [inputText, setInputText] = useState(""); // 검색 입력 텍스트
  const [searchResults, setSearchResults] = useState([]); // 검색 결과(자동완성 기능)
  const [selectedResult, setSelectedResult] = useState(null); // 선택한 검색 결과
  const [highlightedResult, setHighlightedResult] = useState(null); // 클릭하여 강조된 결과
  const [searchHistory, setSearchHistory] = useState([]); // 검색 기록(로컬스토리지)
  
  const setSearchPlace = useSetRecoilState(searchPlace); // 선택한 장소명 atom으로 관리

  // Kakao Maps API를 이용한 검색 함수
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

  // 검색 입력 텍스트 변경 시 딜레이를 두고 검색 수행
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 200); // 300ms 딜레이

    return () => clearTimeout(delayDebounceFn);
  }, [inputText, handleSearch]);

  // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 검색 결과 클릭 시 장소명 로컬스토리지에 저장 및 searchPlace atom 값 업데이트
  const handleResultClick = (placeName) => {
    setSearchPlace(placeName);
    const newHistory = [placeName, ...searchHistory.filter(item => item !== placeName)];
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSelectedResult(placeName);
    setHighlightedResult(placeName);
    
    // 500ms 후에 배경색 원래대로 되돌리기
    setTimeout(() => {
      setHighlightedResult(null);
    }, 500);
  };

  // 입력 텍스트 변경 핸들러
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 검색 결과가 없을 때 로컬스토리지의 검색 기록을 표시
  const resultsToShow = searchResults.length > 0 ? searchResults : searchHistory;

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
        {resultsToShow.map((result, index) => (
          <ResultItem 
            key={index} 
            onClick={() => handleResultClick(result.place_name || result)}
            selected={highlightedResult === (result.place_name || result)}
          >
            {searchResults.length > 0 ? (
              <PlaceIcon icon={faLocationDot} />
            ) : (
              <HistoryIcon icon={faClockRotateLeft} />
            )}
            <PlaceName>{result.place_name || result}</PlaceName>
          </ResultItem>
        ))}
      </ResultContainer>
    </React.Fragment>
  );
}

export default SearchPlace;
