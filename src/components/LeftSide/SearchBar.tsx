import React from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <SearchBarStyles className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch />
    </SearchBarStyles>
  );
}

const SearchBarStyles = styled.div`
  background-color: #e5e5e5;
  padding: 0.5rem 0.75rem;
  border-radius: 5px;

  svg {
    color: #a4a5a3;
  }

  input {
    width: 100%;
  }
`;
