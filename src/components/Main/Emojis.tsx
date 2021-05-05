import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { MessengerContext } from "../../context/context";
import { AiFillDislike, AiFillHeart, AiFillLike } from "react-icons/ai";
import { ImShocked } from "react-icons/im";
import { FaRegAngry, FaRegLaughSquint } from "react-icons/fa";
import { RiEmotionSadLine } from "react-icons/ri";

interface EmojisProps extends UlProps {
  id: number;
}

export default function Emojis({ sender, isLeft, id }: EmojisProps) {
  const { handleSpecificConv } = useContext(MessengerContext);

  const setReaction = (id: number, reaction: JSX.Element) => {
    handleSpecificConv!(id, ["reaction"], [reaction]);
  };

  return (
    <Ul isLeft={isLeft} sender={sender}>
      {[
        <AiFillHeart />,
        <FaRegLaughSquint />,
        <ImShocked />,
        <RiEmotionSadLine />,
        <FaRegAngry />,
        <AiFillLike />,
        <AiFillDislike />,
      ].map((emo, idx) => (
        <li key={idx} onClick={() => setReaction(id, emo)}>
          {emo}
        </li>
      ))}
    </Ul>
  );
}

interface UlProps {
  isLeft: boolean;
  sender: string;
}

const Ul = styled.ul<UlProps>`
  ${({ isLeft, sender }) =>
    isLeft
      ? sender === "me"
        ? css`
            right: 0;
          `
        : css`
            left: 0;
          `
      : css``}
`;
