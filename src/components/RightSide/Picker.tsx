import React, { useContext } from "react";
import { MessengerContext } from "../../context/context";

interface Props {
  kind: (string | JSX.Element)[];
}

export default function Picker({ kind }: Props) {
  const { selected, conversations, handleConversation } = useContext(
    MessengerContext
  );

  const { theme, emoji } = conversations?.find((conv) => conv.id === selected)!;

  const handleClick = (isCurString: boolean, cur: string | JSX.Element) => {
    if (isCurString) {
      handleConversation!(["theme"], [cur]);
    } else {
      handleConversation!(["emoji"], [cur]);
    }
  };
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
