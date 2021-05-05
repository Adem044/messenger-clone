import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { MessengerContext } from "../../context/context";

interface ShowMoreProps {
  id: number;
  setShowForward: React.Dispatch<React.SetStateAction<boolean>>;
  isRight: boolean;
  sender: string;
}

export default function ShowMore({
  id,
  isRight,
  sender,
  setShowForward,
}: ShowMoreProps) {
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
    <ShowMoreStyles sender={sender} isRight={isRight}>
      <li onClick={() => removeMsg(id)}>Remove</li>
      <li onClick={() => setShowForward(true)}>Forward</li>
    </ShowMoreStyles>
  );
}

interface Props {
  isRight: boolean;
  sender: string;
}

const ShowMoreStyles = styled.ul<Props>`
  top: -2rem;
  background-color: white;
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 8.25rem;
  padding: 0.25rem;
  border-radius: 5px;
  box-shadow: 2px 2px 5px gray;

  &::after {
    content: "";
    position: absolute;
    border-top: 8px solid white;
    ${({ isRight, sender }) =>
      isRight
        ? sender === "me"
          ? css`
              border-left: 8px solid transparent;
              border-right: 0px solid transparent;
            `
          : css`
              border-left: 0px solid transparent;
              border-right: 8px solid transparent;
            `
        : css`
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
          `}

    bottom: -0.5rem;
    left: ${({ isRight, sender }) =>
      isRight ? (sender === "me" ? "4%" : "96%") : "50%"};
    transform: translateX(-50%);
  }

  li {
    cursor: pointer;
  }
`;
