import React, { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import styled from "styled-components";
import Menu from "./Menu";
import { MessengerContext } from "../../context/context";
import { Profile } from "../../context/context";
import { shortenText } from "../../utils/helpers";
import { useClickOutside } from "../../utils/customHooks";
import useWindowDimensions from "../WindowSize";

// interface ConversationProps extends Profile {}

type ConversationProps = Omit<Profile, "date">;

export default function Conversation({
  id,
  lastMessage,
  nickname,
  photo,
  profile,
  seen,
}: ConversationProps) {
  const { selected, setSelected, setProfiles, setShowMain } = useContext(
    MessengerContext
  );

  const { width } = useWindowDimensions();

  const [showMenu, setShowMenu] = useState(false);

  const ref = React.useRef<HTMLSpanElement>(null);

  useClickOutside(ref, () => setShowMenu(false));

  const handleClick = () => {
    setSelected!(id);
    setShowMain!(true);
    setProfiles!((prev) => {
      const newPrev = prev.map((pro) => {
        if (pro.id === id) {
          pro.seen = true;
        }
        return pro;
      });
      return newPrev;
    });

    if (width < 600)
      document.querySelector("aside")!.style.transform = "translateX(-100%)";
  };

  return (
    <CoversationStyles
      className={`conversation ${selected === id ? "selected" : ""}`}
      onClick={handleClick}
    >
      <img src={photo} alt="profile" />
      <div className="info">
        <h5 style={{ fontWeight: seen ? "normal" : "bold" }}>
          {nickname ? nickname : profile}
        </h5>
        <p>{shortenText(lastMessage)}</p>
      </div>
      <span
        className="seen"
        style={{ visibility: seen ? "hidden" : "visible" }}
      >
        <FaCircle />
      </span>
      <span
        ref={ref}
        className="menu"
        style={{ display: showMenu ? "grid" : "" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((prev) => !prev);
        }}
      >
        {width > 600 ? <AiOutlineEllipsis /> : <BsThreeDotsVertical />}
        <Menu showMenu={showMenu} seen={seen} id={id} />
      </span>
    </CoversationStyles>
  );
}

const CoversationStyles = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;

  &:hover {
    .menu {
      display: grid;
    }
  }

  img {
    height: 4rem;
    width: 4rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    p {
      font-size: 0.8rem;
    }
  }

  .seen {
    margin-left: auto;
    color: #0098fe;
    font-size: 0.75rem;
  }

  .menu {
    position: absolute;
    display: none;
    place-items: center;
    z-index: 1;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid black;
    right: 2.1rem;
    background-color: white;

    &:hover {
      background-color: inherit;
    }
  }

  @media (max-width: 600px) {
    .menu {
      position: relative;
      display: grid;
      border: 0;
      background-color: transparent;
      margin-left: 1rem;
      right: 0;
      width: max-content;
      height: max-content;
    }
  }
`;
