import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 아이콘 링크 삭제 X
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 해당 컴포넌트에 맞는 css파일 import
import '../../styles/MarketWrite.css';


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
`;

function MarketWrite() {
  return (
    <React.Fragment>
      <Wrapper>

      </Wrapper>
    </React.Fragment>
  );
}

export default MarketWrite