import React from "react";
import styled, { css } from "styled-components";

interface ReplyProps extends DivProps {
  replyId: number;
  msgThatRepliedTo: string | JSX.Element;
  id: number;
  message: string | JSX.Element;
  reaction: JSX.Element | undefined;
}

const Reply = React.forwardRef<HTMLAnchorElement, ReplyProps>(
  ({ reaction, id, message, msgThatRepliedTo, replyId, isLeft, text }, ref) => {
    return (
      <DivTag isLeft={isLeft} text={text}>
        <a className="first" href={`#${replyId}`}>
          {msgThatRepliedTo}
        </a>
        <a className="second" id={`${id}`} ref={ref} href="ada">
          {message}
          <span>{reaction}</span>
        </a>
      </DivTag>
    );
  }
);

export default Reply;

interface DivProps {
  text: string;
  isLeft: boolean;
}

const DivTag = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  a.first {
    background-color: #cecece !important;
    top: 0.65rem;
    padding-bottom: 0.75rem !important;
    &::after {
      content: "${({ text }) => text}";
      text-transform: capitalize;
      font-size: 0.75rem;
      position: absolute !important;
      top: -0.85rem !important;
      z-index: 1 !important;
      width: max-content;
      ${({ isLeft }) =>
        isLeft
          ? css`
              left: 0;
            `
          : css`
              right: 0;
            `}
    }
  }

  a.second {
    width: fit-content;
  }
`;
