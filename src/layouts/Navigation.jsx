import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCloud, faUmbrella, faBookmark, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = styled.div`
  outline: none;
  display:flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background-color: #9FD8F6;
  z-index: 1000;
`;

const Items = styled.ul`
  display: flex;
  width: 100%;
  height: 70px;
`;

const Item = styled(motion.li)`
  width: 20%;
  display:flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isActive ? '#b6e5ff' : '#d7f2ff'};
`;

const NavIcon = styled(motion.div)`
  font-size: 25px;
  color: black;
`;

function Navigation() {
  const location = useLocation();

  const items = [
    { to: "/", icon: faHouse },
    { to: "/weather", icon: faCloud },
    { to: "/market", icon: faUmbrella },
    { to: "/bookmark", icon: faBookmark },
    { to: "/mypage", icon: faUser },
  ];

  return (
    <Nav>
      <Items>
        {items.map(item => (
          <Item
            key={item.to}
            isActive={location.pathname === item.to}
          >
            <Link to={item.to}>
              <NavIcon whileTap={{ scale: 0.85 }}>
                <FontAwesomeIcon icon={item.icon} />
              </NavIcon>
            </Link>
          </Item>
        ))}
      </Items>
    </Nav>
  );
}

export default Navigation