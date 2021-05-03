import React, { useContext } from "react";
import styled from "styled-components";
import { MessengerContext, Profile } from "../../context/context";
import useWindowDimensions from "../WindowSize";

interface SimpleConvProps extends Profile {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

// type NewProps = Omit<Profile, "date" | "lastMessage" | "seen">;

export default function SimpleConv({
  nickname,
  profile,
  photo,
  id,
  setSearch,
}: SimpleConvProps) {
  const { setSelected, setShowMain, setProfiles } = useContext(
    MessengerContext
  );

  const { width } = useWindowDimensions();

  const handleClick = () => {
    setSelected!(id);
    setShowMain!(true);
    setProfiles!((prev) => {
      const newPrev = prev.map((pro) => {
        if (pro.id === id) {
          pro.seen = true;
        }
        return pro;
      });
      return newPrev;
    });

    if (width < 600)
      document.querySelector("aside")!.style.transform = "translateX(-100%)";
    setSearch("");
  };
  return (
    <SimpleConvStyles onClick={handleClick}>
      <img src={photo} alt="pic" />
      <p>{nickname ? nickname : profile}</p>
    </SimpleConvStyles>
  );
}

const SimpleConvStyles = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  img {
    height: 4rem;
    width: 4rem;
  }
  p {
    font-size: 13.28px;
    margin-left: 1rem;
  }
`;