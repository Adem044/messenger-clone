import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";
import Bottom from "./Bottom";
import Medium from "./Medium";
import TopBar from "./TopBar";

export default function Main() {
  const [reply, setReply] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    message: string | JSX.Element;
    sender: string;
    id: number;
  }>({ message: "", sender: "", id: 1100 });

  const { conversations, selected, showSearchBar, showMain } = useContext(
    MessengerContext
  )!;

  const { conversations: conversation } = conversations?.find(
    (conv) => conv.id === selected
  )!;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleReply = (
    message: string | JSX.Element,
    sender: string,
    id: number
  ) => {
    const obj = {
      message,
      sender,
      id,
    };
    inputRef.current?.focus();
    setReplyTo(obj);
  };

  const getFocused = () => {
    inputRef.current?.focus();
  };

  return (
    <MainStyles showMain={showMain!}>
      <TopBar />
      <article className={showSearchBar ? "minus" : undefined}>
        <div className="medium">
          {conversation.map((conv, idx) => (
            <Medium
              key={idx}
              props={{
                getFocused,
                handleReply,
                setReply,
                id: idx,
                length: conversation.length,
              }}
              {...conv}
            />
          ))}
        </div>
      </article>
      <Bottom ref={inputRef} {...replyTo} reply={reply} setReply={setReply} />
    </MainStyles>
  );
}

interface Props {
  showMain: boolean;
}

const MainStyles = styled.div<Props>`
  height: 100%;
  position: relative;
  flex-grow: 1;

  transform: ${({ showMain }) =>
    showMain ? "translateX(0%)" : "translateX(-100%)"};

  transition: all 0.2s ease-in-out;

  article {
    height: calc(100% - 4rem - 72px);
    display: block;
    overflow-y: auto;

    &.minus {
      height: calc(100% - 4rem - 111px);
    }

    .medium {
      min-height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      row-gap: 0.5rem;
      padding: 0.5rem 0;
    }
  }

  @media (max-width: 600px) {
    article {
      height: calc(100% - 3rem - 72px);

      &.minus {
        height: calc(100% - 3rem - 111px);
      }
    }
  }
`;
