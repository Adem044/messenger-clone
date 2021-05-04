import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MessengerContext } from "../../context/context";
import Conversation from "./Conversation";
import SearchBar from "./SearchBar";
import SimpleConv from "./SimpleConv";
import TopBar from "./TopBar";

export default function LeftSide() {
  const [search, setSearch] = useState("");
  const { profiles, showLeftSide } = useContext(MessengerContext);

  const filteredProfiles = profiles?.filter((pro) =>
    pro.profile.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <LeftSideStyles show={showLeftSide!}>
      <TopBar />
      <SearchBar search={search} setSearch={setSearch} />
      {search
        ? filteredProfiles?.map((pro) => (
            <SimpleConv key={pro.id} {...pro} setSearch={setSearch} />
          ))
        : profiles?.map((pro) => <Conversation key={pro.id} {...pro} />)}
    </LeftSideStyles>
  );
}

interface Props {
  show: boolean;
}

const LeftSideStyles = styled.aside<Props>`
  padding: 1rem 0;
  flex-basis: 20rem;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: ${({ show }) => (show ? "translateX(0%)" : "translateX(-100%)")};
  transition: all 0.2s ease-in-out;

  .top-bar,
  .search-bar {
    margin: 0 1rem;
  }

  .top-bar,
  .search-bar,
  .conversation {
    display: flex;
    align-items: center;
  }

  .selected {
    background-color: #e3e3e3;
  }

  @media (max-width: 600px) {
    .selected {
      background-color: inherit;
    }
  }
`;
