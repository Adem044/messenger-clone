import React from "react";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";

export default function TopBar() {
  return (
    <TopBarStyles className="top-bar">
      <img src="https://randomuser.me/api/portraits/men/40.jpg" alt="" />
      <h4>Messenger</h4>
      <FaEdit />
    </TopBarStyles>
  );
}

const TopBarStyles = styled.div`
  justify-content: space-between;

  img {
    width: 2.7rem;
    height: 2.7rem;
  }

  svg {
    font-size: 1.4rem;
  }
`;
