import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
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
  &:last-child {
    //버튼 컨테이너
    width: 15%;
    padding: 0px;
    margin-left: 0px;
    justify-content: flex-end;
  }
`;

const Input = styled(motion.input)`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  background-color: whitesmoke;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
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
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => {
    setSearchOpen(true);
  };

  return (
    <SearchContainer >
      <Container>
        <Icon icon={faMagnifyingGlass} />
        <Input placeholder="장소·주소 검색"></Input>
      </Container>
      <Container>
        <Btn onClick={openSearch}>
          길찾기
        </Btn>
      </Container>
    </SearchContainer>
  );
}

// function SearchBox() {
//   return(
//     <form class="searchBox" action="/main/POI/result" method="get" style={{position: "absolute", zIndex: "2"}}>
//       <div class="searchBox-component">
//         <input id="start-field" autocomplete="off" name="start" required type="text" placeholder="출발지 검색" />
//         <input id="start-lat" type="hidden" name="start_lat" />
//         <input id="start-lon" type="hidden" name="start_lon" />

//         <input id="end-field" autocomplete="off" name="end" required type="text" placeholder="목적지 검색" />
//         <input id="end-lat" type="hidden" name="end_lat" />
//         <input id="end-lon" type="hidden" name="end_lon" />
//       </div>
//       <div class="searchBox-component">
//         <input type="submit" value="길찾기"/>
//       </div>
//     </form>
//   );
// }


export default SearchBox