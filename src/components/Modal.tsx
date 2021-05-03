import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal-root")!;

interface Props {
  children: JSX.Element;
}

export default function Modal({ children }: Props) {
  return ReactDOM.createPortal(
    <ModalStyles>{children}</ModalStyles>,
    modalRoot
  );
}

const ModalStyles = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: white;
  z-index: 5;
  align-items: center;
  width: max-content;
  padding: 1.5rem 0;
  top: 50%;
  left: 50%;
  min-width: 25rem;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset;
  border-radius: 8px;
  hr {
    width: 90%;
  }

  div.picker {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 2rem;

    > span {
      padding: 0.25rem;
      display: grid;

      > span {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        cursor: pointer;
        display: grid;
        place-items: center;
        font-size: 1.9rem;
      }
    }

    span.selected-theme {
      background-color: rgb(218, 218, 218);
      border-radius: 8px;
    }

    span.red {
      background-color: red;
    }

    span.blue {
      background-color: blue;
    }

    span.yellow {
      background-color: yellow;
    }

    span.green {
      background-color: green;
    }
  }

  div.buttons {
    display: flex;
    width: 100%;
    padding: 0 2rem;
    justify-content: flex-end;
    column-gap: 1rem;

    button {
      padding: 0.75rem 1.75rem;
      cursor: pointer;
      border-radius: 6px;
      background-color: rgb(245, 245, 245);
      font-weight: bolder;

      &:last-of-type {
        background-color: #0099ff;
      }
    }
  }

  div.nicknames {
    align-self: flex-start;
    width: 100%;
    padding: 0 1rem;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 2.5rem;
      min-height: 40px;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }

      .edit {
        font-size: 1.25rem;
        cursor: pointer;
      }

      h5 {
        width: 100%;
        padding-left: 0.75rem;
        text-align: left;
      }

      input {
        width: 100%;
        margin: 0 0.75rem;
        padding: 0.25rem;
        background-color: white;

        &:focus {
          border: 1px solid rgb(0, 153, 255);
          border-radius: 6px;

          &:hover {
            background-color: rgb(206, 208, 212);
          }
        }
      }
    }
  }

  div.columns {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;

    > * {
      width: 100%;
    }

    svg {
      font-size: 2.25rem;
      position: absolute;
      right: 1rem;
      width: auto;
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      border-radius: 50%;
      padding: 0.25rem;
    }
  }

  div.search-form {
    width: 100%;

    input {
      width: 100%;
      padding: 0.25rem 0.5rem;
    }

    svg {
      color: gray;
    }
  }

  div.search-form {
    width: 80%;
    padding: 0.25rem 1rem;
    display: flex;
    align-items: center;
    border-radius: 50px;
    background-color: #e9e9e9;
  }

  .profiles {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 0.5rem;
  }

  .profile {
    display: flex;
    align-items: center;
    width: 100%;

    img {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.75rem;
    }

    button {
      margin-left: auto;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      border: 0;
      font-size: 1rem;
      color: #1a2929;
      cursor: pointer;
    }
  }
`;
