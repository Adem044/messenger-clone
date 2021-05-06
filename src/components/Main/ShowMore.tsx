import React, { useContext } from "react";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";

interface ShowMoreProps {
  id: number;
  setShowForward: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShowMore({ id, setShowForward }: ShowMoreProps) {
  const { setConversations, selected, handleSpecificConv } = useContext(
    MessengerContext
  );

  const removeMsg = (id: number) => {
    setConversations!((prev) => {
      const newPrev = prev.map((conv) => {
        if (conv.id === selected) {
          conv.conversations.forEach((conver) => {
            if (conver.msgThatRepliedTo === conv.conversations[id].message) {
              conver.msgThatRepliedTo = "Message is removed";
            }
          });
        }
        return conv;
      });

      return newPrev;
    });
    handleSpecificConv!(
      id,
      ["isRemoved", "hasReply", "message"],
      [true, false, "Message is Removed"]
    );
  };
  return (
    <ShowMoreStyles>
      <li onClick={() => removeMsg(id)}>Remove</li>
      <li onClick={() => setShowForward(true)}>Forward</li>
    </ShowMoreStyles>
  );
}

const ShowMoreStyles = styled.ul`
  top: -2rem;
  background-color: white;
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 8.25rem;
  padding: 0.25rem;
  border-radius: 5px;
  box-shadow: 2px 2px 5px gray;
  color: black;

  &::after {
    content: "";
    position: absolute;
    border-top: 8px solid white;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  li {
    cursor: pointer;
  }
`;
