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
  const { conversations, setConversations, setProfiles } = useContext(
    MessengerContext
  );

  const { conversations: fixed } = conversations!.find(
    (conv) => conv.id === id
  )!;

  const handleClick = () => {
    setConversations!((prev) => {
      return [...prev].map((conv) => {
        if (conv.id === id) {
          const newConv = {
            sender: "me",
            message,
            isRemoved: false,
            hasReply: false,
          };

          conv.conversations = [...fixed, newConv];
        }
        return conv;
      });
    });
    setProfiles!((prev) => {
      const newPrev = [...prev];
      newPrev.forEach((profile) => {
        if (profile.id === id) {
          profile.lastMessage = message;
          profile.seen = false;
          profile.date = new Date().getTime();
        }
      });
      return newPrev.sort((a, b) => {
        if (a.date! > b.date!) return -1;
        if (a.date! < b.date!) return 1;
        return 0;
      });
    });
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
