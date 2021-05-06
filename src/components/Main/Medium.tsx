import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BiDotsVertical } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import styled from "styled-components";
import Modal from "../Modal";
import Reply from "./Reply";
import Forward from "./Forward";
import { MessengerContext } from "../../context/context";
import { Conversations } from "../../context/context";
import Emojis from "./Emojis";
import ShowMore from "./ShowMore";

interface MediumProps extends Conversations {
  props: {
    id: number;
    length: number;
    setReply: React.Dispatch<React.SetStateAction<boolean>>;
    getFocused: () => void;
    handleReply: (
      message: string | JSX.Element,
      sender: string,
      id: number
    ) => void;
  };
}

export default function Medium({
  props: { id, length, setReply, getFocused, handleReply },
  sender,
  message,
  hasReply,
  isRemoved,
  addImg,
  reaction,
  replyId,
  msgThatRepliedTo,
  replyTo,
}: MediumProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showForward, setShowForward] = useState(false);
  const [isLeft, setIsLeft] = useState(true);

  const ref = useRef<HTMLAnchorElement>(null);
  const divTag = useRef<HTMLDivElement>(null);

  const { selected, conversations, profiles } = useContext(MessengerContext);

  const { theme } = conversations?.find((conv) => conv.id === selected)!;

  const { photo } = profiles?.find((pro) => pro.id === selected)!;

  const img = addImg
    ? sender === "me"
      ? "https://randomuser.me/api/portraits/men/40.jpg"
      : photo
    : "";

  useEffect(() => {
    if (id === length - 1) ref.current?.focus();
    getFocused();
  }, []);

  useLayoutEffect(() => {
    setIsLeft(ref.current?.offsetWidth! < 65);
  }, [message]);

  const clasName = sender === "me" ? "right" : `left ${theme}`;

  useEffect(() => {
    if (showForward) {
      (document.querySelector(
        "#modal-root"
      ) as HTMLDivElement).style.transform = "translateX(0%)";
    } else {
      (document.querySelector(
        "#modal-root"
      ) as HTMLDivElement).style.transform = "";
    }
  }, [showForward]);

  return (
    <MediumStyles
      ref={divTag}
      className={`wrapper ${clasName}`}
      onMouseLeave={() => {
        setShowMenu(false);
        setShowEmojis(false);
      }}
    >
      <img src={img} alt="" />
      {hasReply ? (
        <Reply
          ref={ref}
          msgThatRepliedTo={msgThatRepliedTo!}
          isLeft={(msgThatRepliedTo as string).length > 30}
          text={`${sender} replied to ${replyTo}`}
          id={id}
          message={message}
          reaction={reaction}
          replyId={replyId!}
        />
      ) : (
        <a
          ref={ref}
          id={`${id}`}
          href="ada"
          className={isRemoved ? "removed" : ""}
          title={new Date().toLocaleTimeString()}
        >
          {message}
          <span className={reaction ? "reaction" : undefined}>{reaction}</span>
        </a>
      )}
      <div className="icons">
        <div className="show-emojis">
          <GrEmoji
            onClick={() => {
              setShowEmojis((prev) => !prev);
              setShowMenu(false);
            }}
          />
          {showEmojis && <Emojis id={id} sender={sender} isLeft={isLeft} />}
        </div>
        <FaReply
          onClick={() => {
            setReply(true);
            handleReply(message, sender, id);
          }}
        />
        <div className="show-more">
          <BiDotsVertical
            onClick={() => {
              setShowMenu((prev) => !prev);
              setShowEmojis(false);
            }}
          />
          {showMenu && <ShowMore id={id} setShowForward={setShowForward} />}
        </div>
      </div>
      {showForward && (
        <Modal>
          <Forward props={{ showForward, setShowForward, message }} />
        </Modal>
      )}
    </MediumStyles>
  );
}

const MediumStyles = styled.div`
  display: flex;
  column-gap: 0.25rem;
  align-items: center;

  &:hover {
    .icons {
      display: flex;
    }
  }

  img {
    width: 1.25rem;
    align-self: flex-end;
  }
  a {
    max-width: 30rem;
    word-wrap: break-word;
    padding: 0.5rem;
    text-decoration: none;
    color: black;
    position: relative;
    border-radius: 10px;

    span {
      position: absolute;
      bottom: -0.5rem;

      &.reaction {
        background-color: mediumturquoise;

        border-radius: 50%;
        height: 1.15rem;
        width: 1.15rem;
        display: grid;
        place-items: center;
      }
    }
  }

  a.removed {
    background-color: transparent;
    border: 1px solid black;
    font-style: italic;
    font-size: 0.75rem;
    padding: 0.35rem;
  }

  .icons {
    display: none;
    column-gap: 0.25rem;
    padding: 0.25rem;
    color: #b8babc;

    svg {
      cursor: pointer;
    }

    .show-emojis {
      position: relative;
      display: grid;
      place-items: center;

      ul {
        top: -2.5rem;
        background-color: white;
        position: absolute;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0.5rem;
        column-gap: 0.25rem;
        border-radius: 50px;
        box-shadow: 2px 2px 5px gray;
        align-items: center;
        color: #bdbd13;
        font-size: 1.5rem;

        li {
          display: grid;
        }
      }
    }

    .show-more {
      position: relative;
      display: grid;
      place-items: center;
    }
  }

  &.right {
    align-self: flex-end;
    flex-direction: row-reverse;
    a {
      background-color: rgb(228, 230, 235);

      span {
        left: 0.25rem;
      }
    }
    a.removed {
      border-right: 0;
    }
    .icons {
      flex-direction: row-reverse;
    }
  }

  &.left {
    align-self: flex-start;
    a.first {
      align-self: flex-start;
      &::after {
        right: 0;
        left: 0;
      }
    }
    a.second {
      align-self: flex-start;
    }
    a {
      background-color: #0098fe;

      span {
        right: 0.25rem;
      }
    }
    a.removed {
      border-left: 0;
    }
  }

  &.left.red a {
    background-color: red;
  }

  &.left.green a {
    background-color: green;
  }

  &.left.yellow a {
    background-color: yellow;
  }

  @media (max-width: 600px) {
    max-width: 100%;

    a {
      max-width: 63%;
    }

    .icons {
      display: flex;
    }
  }
`;
