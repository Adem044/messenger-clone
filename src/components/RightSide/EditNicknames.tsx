import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MessengerContext } from "../../context/context";
import Edit from "./Edit";

export default function EditNicknames() {
  const { setProfiles, selected } = useContext(MessengerContext);

  const changeProfileName = (profile: string) => {
    setProfiles!((prev) => {
      const newProfiles = [...prev];
      return newProfiles.map((cur) => {
        if (cur.id === selected!) {
          cur.nickname = profile;
        }

        return cur;
      });
    });
  };
  return (
    <div className="nicknames">
      <Edit changeProfileName={changeProfileName} />
      <div>
        <img src="https://randomuser.me/api/portraits/men/40.jpg" alt="" />
        <h5>Adem Cesc</h5>
        <FaEdit className="edit" />
      </div>
    </div>
  );
}
