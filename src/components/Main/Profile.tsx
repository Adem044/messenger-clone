import React, { useContext } from "react";
import { MessengerContext } from "../../context/context";

interface ProfileProps {
  id: number;
  photo: string;
  profile: string;
  message: string | JSX.Element;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function Profile({
  id,
  photo,
  profile,
  message,
  disabled,
  setDisabled,
}: ProfileProps) {
  const { addToConversation, handleProfiles } = useContext(MessengerContext);

  const handleClick = () => {
    const newConv = {
      sender: "me",
      message,
      isRemoved: false,
      hasReply: false,
    };

    addToConversation!(newConv, id);

    handleProfiles!(
      ["lastMessage", "seen", "date"],
      [message, false, new Date().getTime()],
      id,
      true
    );
    setDisabled((prev) => {
      const newPrev = [...prev];
      newPrev[id - 1] = true;
      return newPrev;
    });
  };

  return (
    <div className="profile" key={id}>
      <img src={photo} alt="profile" />
      <p>{profile}</p>
      <button disabled={disabled} onClick={handleClick}>
        {disabled ? "sent" : "send"}
      </button>
    </div>
  );
}
