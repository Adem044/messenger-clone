import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MessengerContext } from "../../context/context";

interface Props {
  changeProfileName: (profile: string) => void;
}

export default function Edit({ changeProfileName }: Props) {
  const [edit, setEdit] = useState(false);
  const { profiles, selected } = useContext(MessengerContext);
  const { nickname: nickName, photo, profile } = profiles?.find(
    (pro) => pro.id === selected
  )!;
  const [nickname, setNickname] = useState(nickName ? nickName : profile);
  const ref = useRef<HTMLInputElement>(null);

  const prevNickname = useRef(profile);

  useEffect(() => {
    prevNickname.current = nickname!;
    ref.current?.focus();
  }, [edit]);

  return (
    <div>
      <img src={photo} alt="profile" />
      {edit ? (
        <input
          ref={ref}
          value={nickname}
          type="text"
          placeholder={prevNickname.current}
          onBlur={() => {
            setEdit(false);
            changeProfileName(nickname!);
          }}
          onChange={(e) => setNickname(e.target.value)}
        />
      ) : (
        <h5>{nickname ? nickname : profile}</h5>
      )}
      <FaEdit className="edit" onClick={() => setEdit(true)} />
    </div>
  );
}
