import React, { useContext } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";
import List from "./List";

export default function RightSide() {
  const { profiles, selected, setShowRightSide, showRightSide } = useContext(
    MessengerContext
  );
  const { photo, profile, nickname } = profiles?.find(
    (pro) => pro.id === selected
  )!;
  return (
    <RightSideStyles show={showRightSide!} className="sidebar">
      <span onClick={() => setShowRightSide!(false)}>
        <FaArrowCircleLeft />
      </span>
      <img src={photo} alt="" />
      <h4>{nickname ? nickname : profile}</h4>
      <List />
    </RightSideStyles>
  );
}

interface Props {
  show: boolean;
}

const RightSideStyles = styled.aside<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding: 1rem 1.5rem;
  margin-left: auto;
  flex-basis: 20rem;
  background-color: lavenderblush;

  z-index: ${({ show }) => (show ? "10" : "")};

  > span {
    display: none;
  }

  img {
    width: 5rem;
    height: 5rem;
  }

  ul.first-list {
    align-self: flex-start;
    width: 100%;
    li {
      margin: 1.5rem 0;
      cursor: pointer;
    }
    > li {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    ul.customize {
      li {
        display: flex;
        column-gap: 0.9rem;
      }
    }
  }

  @media (max-width: 600px) {
    > span {
      display: block;
      position: absolute;
      left: 1.5rem;
      top: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;
