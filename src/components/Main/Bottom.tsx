import React, { useState, useContext, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSticker, BiSend } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import ReplyPopUp from "./ReplyPopUp";
import { MessengerContext } from "../../context/context";
import { ReplyPopUpProps } from "./ReplyPopUp";
import styled from "styled-components";

interface Props extends ReplyPopUpProps {
  reply: boolean;
  id: number;
}

const Bottom = React.forwardRef<HTMLInputElement, Props>(
  ({ setReply, reply, message, sender, id }, ref) => {
    const [selectValue, setSelectValue] = useState("me");
    const [inputValue, setInputValue] = useState("");
    const {
      conversations,
      profiles,
      addToConversation,
      handleProfiles,
      selected,
      setConversations,
    } = useContext(MessengerContext);

    const { emoji } = conversations?.find((conv) => conv.id === selected)!;

    const { nickname, profile } = profiles?.find((pro) => pro.id === selected)!;

    useEffect(() => {
      setSelectValue("me");
    }, [profile]);

    const sortProfiles = (message: string | JSX.Element) => {
      handleProfiles!(
        ["lastMessage", "date"],
        [message, new Date().getTime()],
        undefined,
        true
      );
    };

    const addConversation = (
      sender: string,
      message: string | JSX.Element,
      id?: number
    ) => {
      const newConv = {
        sender,
        message,
        isRemoved: false,
        hasReply: false,
        addImg: true,
      };

      setConversations!((prev) => {
        const newPrev = prev.map((conv) => {
          if (
            conv.id === selected &&
            conv.conversations[conv.conversations.length - 1]?.sender === sender
          ) {
            conv.conversations[conv.conversations.length - 1].addImg = false;
          }
          return conv;
        });
        return newPrev;
      });

      addToConversation!(newConv);

      sortProfiles(message);
    };

    const addReplytoMsg = (
      senderNew: string,
      messageNew: string | JSX.Element
    ) => {
      const newMsg = {
        sender: senderNew,
        message: messageNew,
        isRemoved: false,
        hasReply: true,
        replyTo: sender,
        msgThatRepliedTo: message,
        replyId: id,
        addImg: true,
      };

      addToConversation!(newMsg);

      sortProfiles(message);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue) {
        if (reply) {
          addReplytoMsg(selectValue, inputValue);
          setReply(false);
        } else {
          addConversation(selectValue, inputValue);
        }
        setInputValue("");
      }
    };

    const handleClick = () => {
      if (reply) {
        addReplytoMsg(selectValue, inputValue);
        setReply(false);
      } else {
        addConversation(selectValue, inputValue);
      }
      setInputValue("");
    };

    return (
      <BottomStyles>
        {reply && (
          <ReplyPopUp sender={sender} setReply={setReply} message={message} />
        )}
        <div className={`writing ${inputValue ? "none" : ""}`}>
          <div className="wrapper">
            <AiOutlinePlusCircle />
            <div className="inner-wrapper">
              <HiOutlinePhotograph />
              <BiSticker />
              <RiFileGifLine />
            </div>
          </div>
          <input
            ref={ref}
            type="text"
            placeholder="Aa"
            name="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <select
            value={selectValue}
            name="sender"
            id="sender"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="me">Me</option>
            <option value={nickname ? nickname : profile}>
              {nickname ? nickname : profile}
            </option>
          </select>
          <span
            onClick={() =>
              inputValue ? handleClick() : addConversation(selectValue, emoji!)
            }
          >
            {inputValue ? <BiSend /> : emoji}
          </span>
        </div>
      </BottomStyles>
    );
  }
);

export default Bottom;

const BottomStyles = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: inset 0 1px 0px black, 0px -2.5px 3px #e5e5e5;
  padding: 0 1rem;

  .none {
    .wrapper {
      .inner-wrapper {
        display: none;
      }
    }
  }
  .writing {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    height: 4rem;
    width: 100%;
    color: #06b0ff;

    .wrapper,
    .inner-wrapper {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    span {
      display: grid;
    }

    svg {
      cursor: pointer;
    }

    input {
      width: 100%;
      border-radius: 10px;
      height: 50%;
      padding: 0 0.5rem;
      background-color: #e9e9e9;
    }
  }

  @media (max-width: 600px) {
    .writing {
      height: 3rem;

      input {
        height: 60%;
      }
    }
  }
`;
