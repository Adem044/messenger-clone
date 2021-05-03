import React, { useContext } from "react";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";

interface MenuProps {
  showMenu: boolean;
  seen: boolean;
  id: number;
}

export default function Menu({ seen, showMenu, id }: MenuProps) {
  const {
    setProfiles,
    setConversations,
    setShowRightSide,
    setSelected,
    selected,
  } = useContext(MessengerContext);

  const deleteCoversation = () => {
    setProfiles!((prev) => {
      const newPrev = [...prev].filter((profile) => profile.id !== id);

      return newPrev;
    });

    setConversations!((prev) => {
      const newPrev = [...prev].filter((conv) => conv.id !== id);

      return newPrev;
    });

    if (id === selected) setShowRightSide!(false);
  };

  const setSeen = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();
    setProfiles!((prev) => {
      const newPrev = prev.map((pro) => {
        if (pro.id === id) {
          pro.seen = !pro.seen;
        }
        return pro;
      });
      return newPrev;
    });

    if (id === selected) setSelected!(0);
  };

  return (
    <MenuStyles style={{ display: showMenu ? "block" : "none" }}>
      <p onClick={setSeen}>{!seen ? "Mark as Read" : "Mark as Unread"}</p>
      <hr />
      <p
        onClick={(e) => {
          e.stopPropagation();
          deleteCoversation();
        }}
      >
        Delete Conversation
      </p>
    </MenuStyles>
  );
}

const MenuStyles = styled.div`
  width: max-content;
  position: absolute;
  z-index: 2;
  padding: 0.75rem;
  top: calc(10px + 2rem);
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 10px gray;

  &::before {
    content: "";
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }

  hr {
    margin: 0.5rem 0;
  }

  p:hover {
    background: #a4a5a3;
    width: fit-content;
  }

  @media (max-width: 600px) {
    top: calc(10px + 1rem);
    transform: translateX(-50%);

    &::before {
      border-right: 0px solid transparent;
      left: 96%;
    }
  }
`;
