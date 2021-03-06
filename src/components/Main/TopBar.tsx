import React, { useContext } from "react";
import { FaArrowCircleLeft, FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";
import SearchBar from "../Main/SearchBar";
import useWindowDimensions from "../WindowSize";

export default function TopBar() {
  const {
    profiles,
    selected,
    setShowRightSide,
    setShowLeftSide,
    showSearchBar,
    setShowMain,
  } = useContext(MessengerContext);
  const { profile, nickname, photo } = profiles?.find(
    (pro) => pro.id === selected
  )!;

  const { width } = useWindowDimensions();

  const handleClick = () => {
    setShowMain!(false);

    if (width < 600) setShowLeftSide!(true);
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
  box-shadow: inset 0 -1px 0px black, 0px 2.5px 3px #e5e5e5;

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
