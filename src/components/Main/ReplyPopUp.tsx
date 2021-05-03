import React from "react";
import styled from "styled-components";

export interface ReplyPopUpProps {
  sender: string;
  message: string | JSX.Element;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReplyPopUp({
  message,
  sender,
  setReply,
}: ReplyPopUpProps) {
  return (
    <ReplyPopUpStyles>
      <span onClick={() => setReply(false)}>x</span>
      <p>
        Replying to <strong>{sender}</strong>
      </p>
      {typeof message === "string" ? (
        <p className="message">{message}</p>
      ) : (
        message
      )}
    </ReplyPopUpStyles>
  );
}

const ReplyPopUpStyles = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem 0 0 0;

  span {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
  }
  p {
    font-size: 0.75rem;
  }
  p.message {
    color: gray;
    margin-top: 0.25rem;
  }
`;
