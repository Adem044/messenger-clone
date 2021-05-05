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
  showLeftSide: boolean;
  showMain: boolean;
  selected: number;
  setProfiles: UseState<Profile[]>;
  setConversations: UseState<Conversation[]>;
  setSelected: UseState<number>;
  setShowRightSide: UseState<boolean>;
  setShowLeftSide: UseState<boolean>;
  setShowSearchBar: UseState<boolean>;
  setShowMain: UseState<boolean>;
  handleConversation: (
    target: (keyof Conversation)[],
    value: Conversation[keyof Conversation][]
  ) => void;
  addToConversation: (value: Conversations, id?: number) => void;
  handleSpecificConv: (
    id: number,
    target: (keyof Conversations)[],
    value: Conversations[keyof Conversations][]
  ) => void;
  handleProfiles: (
    target: (keyof Profile)[],
    value: Profile[keyof Profile][],
    id?: number,
    sort?: boolean
  ) => void;
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
  const [showLeftSide, setShowLeftSide] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleProfiles = (
    target: (keyof Profile)[],
    value: Profile[keyof Profile][],
    id: number = selected,
    sort: boolean = false
  ) => {
    setProfiles((prev) => {
      const newPrev = prev.map((prof) => {
        if (prof.id === id) {
          target.forEach((t, idx) => {
            (prof[t] as Profile[keyof Profile]) = value[idx];
          });
        }
        return prof;
      });
      if (sort) {
        return newPrev.sort((a, b) => {
          if (a.date! > b.date!) return -1;
          if (a.date! < b.date!) return 1;
          return 0;
        });
      }
      return newPrev;
    });
  };

  const handleConversation = (
    target: (keyof Conversation)[],
    value: Conversation[keyof Conversation][]
  ) => {
    setConversations((prev) => {
      const newPrev = prev.map((conv) => {
        if (conv.id === selected) {
          target.forEach((t, idx) => {
            (conv[t] as Conversation[keyof Conversation]) = value[idx];
          });
        }
        return conv;
      });
      return newPrev;
    });
  };

  const addToConversation = (value: Conversations, id: number = selected) => {
    const { conversations: conversation } = conversations.find(
      (cov) => cov.id === id
    )!;
    setConversations!((prev) => {
      const newPrev = [...prev];
      newPrev.forEach((conv) => {
        if (conv.id === id) {
          conv.conversations = [...conversation, value];
        }
      });
      return newPrev;
    });
  };

  const handleSpecificConv = (
    id: number,
    target: (keyof Conversations)[],
    value: Conversations[keyof Conversations][]
  ) => {
    setConversations((prev) => {
      const newPrev = prev.map((conv) => {
        if (conv.id === selected) {
          target.forEach((t, idx) => {
            (conv.conversations[id][
              t
            ] as Conversations[keyof Conversations]) = value[idx];
          });
        }
        return conv;
      });
      return newPrev;
    });
  };

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
        showLeftSide,
        showMain,
        conversations,
        setConversations,
        setProfiles,
        setSelected,
        setShowRightSide,
        setShowLeftSide,
        setShowSearchBar,
        setShowMain,
        handleConversation,
        addToConversation,
        handleSpecificConv,
        handleProfiles,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
