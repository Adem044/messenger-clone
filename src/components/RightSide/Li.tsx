import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp, FaTimes } from "react-icons/fa";
import { nestedLists, colors, emojis } from "../../context/infos";
import Modal from "../Modal";
import Picker from "./Picker";
import EditNicknames from "./EditNicknames";
import { MessengerContext } from "../../context/context";
import useWindowDimensions from "../WindowSize";

interface Props {
  li: string;
  id: number;
}

type FuncProps = {
  id: number;
  icon: (
    theme?: string | undefined,
    emoji?: JSX.Element | undefined
  ) => JSX.Element | undefined;
  text: string;
};

export default function Li({ li, id }: Props) {
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [kindOfModal, setKindOfModal] = useState("");

  const whatToChange: {
    [key: string]: (string | JSX.Element)[];
  } = {
    colors,
    emojis,
  };

  const {
    conversations,
    selected,
    handleConversation,
    setShowSearchBar,
    setShowRightSide,
  } = useContext(MessengerContext);

  const { emoji, theme } = conversations?.find((conv) => conv.id === selected)!;

  const prevTheme = useRef<string>(theme!);
  const prevEmoji = useRef<JSX.Element>(emoji!);

  const { width } = useWindowDimensions();

  useEffect(() => {
    prevTheme.current = theme!;
    prevEmoji.current = emoji!;
  }, [showModal]);

  useEffect(() => {
    setShowList(false);
  }, [selected]);

  const setPrevious = () => {
    if (kindOfModal !== "nicknames") {
      if (kindOfModal === "colors") {
        handleConversation!(["theme"], [prevTheme.current]);
      } else if (kindOfModal === "emojis") {
        handleConversation!(["emoji"], [prevEmoji.current]);
      }
    }
    setShowModal(false);
  };

  const setJSXElement = (kindOf: string, { icon, id, text }: FuncProps) => {
    let show: JSX.Element;
    if (kindOf === "colors") {
      show = icon(theme)!;
    } else if (kindOf === "emojis") {
      show = icon("", emoji)!;
    } else {
      show = icon()!;
    }

    return (
      <li
        key={id}
        onClick={() => {
          setShowModal(true);
          setKindOfModal(kindOf);
        }}
      >
        {show} {text}
      </li>
    );
  };

  useEffect(() => {
    if (showModal) {
      (document.querySelector(
        "#modal-root"
      ) as HTMLDivElement).style.transform = "translateX(0%)";
    } else {
      (document.querySelector(
        "#modal-root"
      ) as HTMLDivElement).style.transform = "";
    }
  }, [showModal]);

  return (
    <>
      <li onClick={() => setShowList((prev) => !prev)}>
        {li} {showList ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
      </li>
      {showList && (
        <ul className="customize">
          {nestedLists[id].map((list) => {
            let jsxElement: JSX.Element;
            if (list.text === "Change Theme") {
              jsxElement = setJSXElement("colors", list);
            } else if (list.text === "Change Emoji") {
              jsxElement = setJSXElement("emojis", list);
            } else if (list.text === "Edit Nciknames") {
              jsxElement = setJSXElement("nicknames", list);
            } else if (list.text === "Search in Conversation") {
              jsxElement = (
                <li
                  key={list.id}
                  onClick={() => {
                    setShowSearchBar!((prev) => !prev);
                    if (width < 600) setShowRightSide!(false);
                  }}
                >
                  {list.icon()} {list.text}
                </li>
              );
            } else {
              jsxElement = (
                <li key={list.id}>
                  {list.icon()} {list.text}
                </li>
              );
            }
            return jsxElement;
          })}
        </ul>
      )}
      {showModal && (
        <Modal>
          <>
            <div className="columns">
              <h1>
                {kindOfModal === "colors"
                  ? "Color"
                  : kindOfModal === "emojis"
                  ? "Emoji"
                  : "Edit Nicknames"}
              </h1>
              <FaTimes onClick={setPrevious} />
            </div>
            <hr />
            {kindOfModal === "nicknames" ? (
              <EditNicknames />
            ) : (
              <>
                <Picker kind={whatToChange[kindOfModal]} />
                <div className="buttons">
                  <button onClick={setPrevious}>Cancel</button>
                  <button onClick={() => setShowModal(false)}>Save</button>
                </div>
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
}
