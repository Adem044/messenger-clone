import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [idx, setIdx] = useState(0);
  const [filteredMsgs, setFilteredMsgs] = useState<
    { message: string; msgId: number }[]
  >([]);
  const [hasColor, setHasColor] = useState(false);

  const { setShowSearchBar, conversations, selected } = useContext(
    MessengerContext
  );

  const { conversations: conversation } = conversations?.find(
    (conv) => conv.id === selected
  )!;

  const messages = useRef<{ message: string; msgId: number }[]>([]);

  useEffect(() => {
    messages.current = conversation.map((cur, id) => {
      return {
        message: typeof cur.message === "string" ? cur.message : "",
        msgId: id,
      };
    });
  }, [conversation]);

  useEffect(() => {
    if (idx) setIdx(0);
    if (filteredMsgs.length) setFilteredMsgs([]);
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      setFilteredMsgs(() => {
        return messages.current.filter((cur) =>
          cur.message
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        );
      });

      setHasColor(!idx && filteredMsgs.length ? true : false);
    }
  };

  const handleArrowUpClick = () => {
    setHasColor((prev) => (prev ? false : prev));
    setIdx((prev) => {
      if (prev + 1 >= filteredMsgs.length) {
        return prev;
      }
      return prev + 1;
    });
  };

  const handleArrowDownClick = () => {
    setIdx((prev) => {
      if (prev - 1 < 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  return (
    <SearchBarStyles>
      <div className="search-form">
        <FaSearch />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
        />
      </div>
      <a
        href={`#${filteredMsgs.length ? filteredMsgs[idx].msgId : ""}`}
        onClick={handleArrowUpClick}
      >
        <FaArrowUp
          style={{
            color: !hasColor && idx + 1 >= filteredMsgs.length ? "gray" : "",
          }}
        />
      </a>
      <a
        href={`#${filteredMsgs.length ? filteredMsgs[idx].msgId : ""}`}
        onClick={handleArrowDownClick}
      >
        <FaArrowDown
          style={{
            color: idx ? "" : "gray",
          }}
        />
      </a>
      <span onClick={() => setShowSearchBar!(false)}>Close</span>
    </SearchBarStyles>
  );
}

const SearchBarStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem 0.5rem;
  gap: 0.5rem;

  span {
    cursor: pointer;
  }

  .search-form {
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 50px;
    background-color: #e9e9e9;
    padding: 0.25rem 0.5rem;

    svg {
      color: gray;
    }

    input {
      width: 100%;
      padding: 0.25rem 0.5rem;
    }
  }
`;
