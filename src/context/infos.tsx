import {
  FaAngellist,
  FaBullseye,
  FaFistRaised,
  FaGrinBeam,
  FaGrinTongueWink,
  FaRegThumbsUp,
  FaSearch,
} from "react-icons/fa";
import { BsType } from "react-icons/bs";

export const messages = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/men/71.jpg",
    profile: "Adem Cesc",
    lastMessage: "",
    nickname: "",
    seen: false,
  },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
    profile: "Dadou ENS",
    lastMessage: "",
    nickname: "",
    seen: false,
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    profile: "John Doe",
    lastMessage: "",
    nickname: "",
    seen: false,
  },
  {
    id: 4,
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    profile: "Luffy D",
    lastMessage: "",
    nickname: "",
    seen: false,
  },
];

export const conversationsModel = [
  {
    id: 1,
    conversations: [],
    theme: "",
    emoji: <FaRegThumbsUp />,
  },
  {
    id: 2,
    conversations: [],
    theme: "",
    emoji: <FaRegThumbsUp />,
  },
  {
    id: 3,
    conversations: [],
    theme: "",
    emoji: <FaRegThumbsUp />,
  },
  {
    id: 4,
    conversations: [],
    theme: "",
    emoji: <FaRegThumbsUp />,
  },
];

export const nestedLists = [
  [
    {
      id: 1,
      icon: (theme?: string) => <FaBullseye style={{ color: theme }} />,
      text: "Change Theme",
    },
    {
      id: 2,
      icon: (theme?: string, emoji?: JSX.Element) => emoji,
      text: "Change Emoji",
    },
    {
      id: 3,
      icon: (theme?: string) => <BsType />,
      text: "Edit Nciknames",
    },
    {
      id: 4,
      icon: (theme?: string) => <FaSearch />,
      text: "Search in Conversation",
    },
  ],
  [
    // {
    //   id: 1,
    //   icon: (theme?: string) => <FaBullseye />,
    //   text: "Change Theme",
    // },
  ],
  [
    // {
    //   id: 1,
    //   icon: (theme?: string) => <FaBullseye />,
    //   text: "Change Theme",
    // },
  ],
];

export const colors = ["red", "blue", "yellow", "green"];
export const emojis = [
  <FaAngellist />,
  <FaFistRaised />,
  <FaGrinBeam />,
  <FaGrinTongueWink />,
];
