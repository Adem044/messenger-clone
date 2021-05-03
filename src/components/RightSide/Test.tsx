import React, { useState } from "react";
// import {
//   FaArrowAltCircleDown,
//   FaArrowCircleUp,
//   FaBullseye,
// } from "react-icons/fa";
// import { nestedLists } from "../../context/infos";
// import Modal from "../Modal";

// interface Props {
//   li: string;
//   id: number;
// }

// export default function Test({ li, id }: Props) {
//   const [showList, setShowList] = useState(false);

//   return (
//     <li onClick={() => setShowList((prev) => !prev)}>
//       {li} {showList ? <FaArrowCircleUp /> : <FaArrowAltCircleDown />}
//       {showList && (
//         <ul>
//           {nestedLists[id].map((list) => {
//             return <li></li>;
//           })}
//         </ul>
//       )}
//     </li>
//   );
// }

// function CustomizeChat() {
//   return <Show></Show>;
// }

// function ChangeTheme() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <li onClick={() => setShowModal(true)}>
//         <FaBullseye style={{ color: "theme" }} /> Change Theme
//       </li>
//       <Modal></Modal>
//     </>
//   );
// }

// function Picker() {
//   return (
//     <div>
//       {kind.map((cur, id) => (
//         <span className={cur} key={id}></span>
//       ))}
//     </div>
//   );
// }

// interface ShowProps {
//   icon: JSX.Element;
//   text: string;
// }

// function Show({ icon, text }: ShowProps) {
//   return (
//     <li onClick={() => {}}>
//       {icon} {text}
//     </li>
//   );
// }
