import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import '../styles/MarketHome.css';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

function Market() {
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

  return (
    <React.Fragment>
      <Wrapper>
        <div className="write-button">
        <Link className="screen-header__menu-link" href="/secondhand/write.html">
          <button>
            게시글 작성 <FontAwesomeIcon icon={faPen} />
          </button>
        </Link>
        </div>
        <div className="post-list" id="postList">
          {/* 게시글 목록이 여기에 렌더링됩니다. */}
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Market
