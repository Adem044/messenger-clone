import React, { createContext, useEffect, useState } from "react";
import { messages, conversationsModel } from "./infos";

export interface Profile {
  id: number;
  photo: string;
  profile: string;
  lastMessage: string | JSX.Element;
  nickname: string;
  date?: number;
  seen: boolean;
}

export interface Conversation {
  id: number;
  conversations: Conversations[];
  theme: string;
  emoji: JSX.Element;
}

export interface Conversations {
  sender: string;
  message: string | JSX.Element;
  reaction?: JSX.Element;
  isRemoved: boolean;
  hasReply: boolean;
  replyTo?: string;
  msgThatRepliedTo?: string | JSX.Element;
  replyId?: number;
}

interface Context {
  profiles: Profile[];
  conversations: Conversation[];
  showSearchBar: boolean;
  showRightSide: boolean;
  showMain: boolean;
  selected: number;
  setProfiles: UseState<Profile[]>;
  setConversations: UseState<Conversation[]>;
  setSelected: UseState<number>;
  setShowRightSide: UseState<boolean>;
  setShowSearchBar: UseState<boolean>;
  setShowMain: UseState<boolean>;
}

type UseState<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  children: JSX.Element;
}

export const MessengerContext = createContext<Partial<Context>>({});

export const Provider = ({ children }: Props) => {
  const [profiles, setProfiles] = useState<Profile[]>(messages);
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsModel
  );
  const [selected, setSelected] = useState(0);
  const [showRightSide, setShowRightSide] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    setProfiles((prev) => {
      const newPrev = [...prev];
      newPrev.forEach((pro) => {
        pro.date = new Date().getTime();
      });
      return newPrev;
    });
  }, []);

  return (
    <MessengerContext.Provider
      value={{
        profiles,
        selected,
        showSearchBar,
        showRightSide,
        showMain,
        conversations,
        setConversations,
        setProfiles,
        setSelected,
        setShowRightSide,
        setShowSearchBar,
        setShowMain,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
