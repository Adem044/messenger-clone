import React from "react";
import Li from "./Li";

export default function List() {
  return (
    <ul className="first-list">
      {["Customize Chat", "Privacy and Support", "Shared Media"].map(
        (li, i) => (
          <Li key={i} li={li} id={i} />
        )
      )}
    </ul>
  );
}
