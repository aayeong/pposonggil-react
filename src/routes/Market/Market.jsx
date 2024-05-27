import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen  } from '@fortawesome/free-solid-svg-icons';

//여기에 해당 화면에 사용한 css 파일 import 해주기
import '../../styles/MarketHome.css';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

function Market() {
  // 여기가 .js에 쓴 내용을 chat-gpt로 다듬어서 여기에 붙여넣기!
  useEffect(() => {
    // 로컬 스토리지에서 post 불러오기
    const renderPosts = () => {
        const postList = document.getElementById('postList');
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach((post, index) => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.dataset.index = index;

            // Create elements for post content
            // ...

            // Append elements to postItem
            // ...

            // 게시글 클릭 시 이벤트 
            postItem.addEventListener('click', () => {
                localStorage.setItem('selectedPost', JSON.stringify(post));
                window.location.href = '/secondhand/show.html';
            });
            // 게시글 목록에 게시글 추가
            postList.appendChild(postItem);
        });
    };
    renderPosts();
  }, []);

  // html에서 긁어온 코드는 return 문 안으로 넣어주면 돼욧
  return (
    <React.Fragment>
      <Wrapper>
        {/* 긁어온 코드는 꼭 <Wrapper>안에 위치하게 해주세용 */}
        {/* html에 있는 <a>태그는 사용 불가해서  <Link></Link>태그로 바꿔주면 됩니당*/}
        <div className="write-button">
        <Link className="screen-header__menu-link" to='/market/write'>
          <button>
            게시글 작성 <FontAwesomeIcon icon={faPen} />
          </button>
        </Link>
        </div>
        <div className="post-list" id="postList">
          {/* 게시글 목록이 여기에 렌더링됩니다. */}
        </div>
        {/* */}
      </Wrapper>
    </React.Fragment>
  )
}

// 무조건 함수명으로 해주세요
export default Market
