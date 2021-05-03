import React, { useContext } from "react";
import { MessengerContext } from "../../context/context";

interface Props {
  kind: (string | JSX.Element)[];
}

export default function Picker({ kind }: Props) {
  const { selected, setConversations, conversations } = useContext(
    MessengerContext
  );

  const { theme, emoji } = conversations?.find((conv) => conv.id === selected)!;

  const handleClick = (isCurString: boolean, cur: string | JSX.Element) =>
    setConversations!((prev) => {
      const prevConv = [...prev];
      prevConv.forEach((conv) => {
        if (conv.id === selected) {
          if (isCurString) {
            conv.theme = cur as string;
          } else {
            conv.emoji = cur as JSX.Element;
          }
        }
      });
      return prevConv;
    });
  return (
    <div className="picker">
      {kind.map((cur, i) => {
        const isCurString = typeof cur === "string";
        return (
          <span
            key={i}
            className={
              (isCurString && cur === theme) || cur == emoji
                ? "selected-theme"
                : ""
            }
            onClick={() => handleClick(isCurString, cur)}
          >
            {isCurString ? (
              <span className={isCurString ? (cur as string) : ""}></span>
            ) : (
              cur
            )}
          </span>
        );
      })}
    </div>
  );
}
