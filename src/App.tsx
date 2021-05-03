import { useContext } from "react";
import styled from "styled-components";
import LeftSide from "./components/LeftSide/LeftSide";
import Main from "./components/Main/Main";
import RightSide from "./components/RightSide/RightSide";
import { MessengerContext } from "./context/context";

function App() {
  const { selected, showRightSide } = useContext(MessengerContext);

  const show = showRightSide && selected ? true : false;

  return (
    <AppStyles className="App">
      <LeftSide />
      {selected ? <Main /> : null}
      {show && <RightSide />}
    </AppStyles>
  );
}

export default App;

const AppStyles = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 600px) {
    width: 100vw;
    > aside,
    > div {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
`;
