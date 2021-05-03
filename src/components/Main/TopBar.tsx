import React, { useContext } from "react";
import { FaArrowCircleLeft, FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";
import SearchBar from "../Main/SearchBar";

export default function TopBar() {
  const {
    profiles,
    selected,
    setShowRightSide,
    showSearchBar,
    setShowMain,
  } = useContext(MessengerContext);
  const { profile, nickname, photo } = profiles?.find(
    (pro) => pro.id === selected
  )!;

  const handleClick = () => {
    setShowMain!(false);
    document.querySelector("aside")!.style.transform = "";
  };
  return (
    <>
      <TopBarStyles className="top-bar">
        <span onClick={handleClick}>
          <FaArrowCircleLeft />
        </span>
        <img src={photo} alt="profile" />
        <h3>{nickname ? nickname : profile}</h3>
        <FaInfoCircle onClick={() => setShowRightSide!((prev) => !prev)} />
      </TopBarStyles>
      {showSearchBar && <SearchBar />}
    </>
  );
}

const TopBarStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;

  > span {
    display: none;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  h3 {
    margin-left: 1rem;
  }

  svg {
    margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    > span {
      display: block;
      margin-right: 1rem;
      cursor: pointer;
    }
  }
`;
