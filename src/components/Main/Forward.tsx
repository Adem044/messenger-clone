import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MessengerContext } from "../../context/context";
import Profile from "./Profile";

interface ForwardProps {
  props: {
    setShowForward: React.Dispatch<React.SetStateAction<boolean>>;
    showForward: boolean;
    message: string | JSX.Element;
  };
}

export default function Forward({
  props: { message, showForward, setShowForward },
}: ForwardProps) {
  const { profiles, selected } = useContext(MessengerContext);
  const [newProfiles, setNewProfiles] = useState(profiles);
  const [disabled, setDisabled] = useState([false, false, false, false]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setNewProfiles((pro) => {
      return [...pro!].filter((pro) => pro.id !== selected);
    });
  }, [showForward]);

  const searchedProfiles = newProfiles?.filter((pro) =>
    pro.profile.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  );
  return (
    <>
      <div className="columns">
        <h1>Forward</h1>
        <FaTimes
          onClick={() => {
            setShowForward(false);
            setDisabled([false, false, false, false]);
          }}
        />
      </div>
      <hr />
      <div className="search-form">
        <FaSearch />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="profiles">
        <h3>recent</h3>
        {searchedProfiles?.map((profile) => {
          return (
            <Profile
              key={profile.id}
              {...profile}
              message={message}
              disabled={disabled[profile.id - 1]}
              setDisabled={setDisabled}
            />
          );
        })}
      </div>
    </>
  );
}
