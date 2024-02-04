import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/graffiti-art.png";
import Meme from "../assets/loader3.gif";

export default function Contacts({ contacts, changeChat }) {
  const navigate= useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const handleSetAvatar= ()=>{
    navigate("/setAvatar")
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>कैनवास</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="wrapper" onClick={handleSetAvatar}>
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="meme">
                <img src={Meme} alt="meme" />
              </div>
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #1585c5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #aae147;
      font-family: "Yatra One", system-ui;
      font-size: 3rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    font-family: "Yatra One", system-ui;
    font-size: 1.25rem;
    // border-radius: 2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #073ebc;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #073ebc;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      :hover .avatar {
        transform: scale(1.25);
      }
      .avatar {
        transition: transform 0.2s cubic-bezier(0.68, -0.6, 0.32, 1.6);
        img {
          height: 3rem;
          border: 2px solid black;
          border-radius: 100%;
        }
        /* :hover {
          transform: scale(1.25);
        } */
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      // background-color: #9a86f3;
      border: 4px solid black;
    }
  }

  .current-user {
    perspective: 800px;
    background-color: #5a7367;
    font-family: "Yatra One", system-ui;
    // font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
    border-right: 2px solid black;
    gap: 2rem;
    .wrapper {
      height: 4.5rem;
      width: 4.5rem;
      /* border: 2px solid black; */
      border-radius: 100%;
      position: relative;
      transition: 1s;
      transform-style: preserve-3d;
      :hover{
        cursor: pointer;
      }
    }
    .avatar {
      position: absolute;
      /* background-color: blueviolet; */
      z-index: 2; /* initially above */
      backface-visibility: hidden;
      img {
        height: 4.5rem;
        max-inline-size: 100%;
        border: 2.5px solid black;
        border-radius: 100%;
      }
    }
    .meme {
      /* border: 2px solid black; */
      position: absolute;
      /* background-color: blanchedalmond; */
      z-index: 1; /* initially below */
      backface-visibility: hidden;
      transform: rotateY(180deg);
      width: 100%;
      img {
        height: 4.5rem;
        max-inline-size: 100%;
        border: 2px solid black;
        border-radius: 100%;
        /* transform: scale(1.25); */
        /* transition: transform 0.2s ease-in-out; */
      }
    }
    .wrapper:hover {
      transform: rotateY(180deg);
      /* transform: scale(1.25); */
    }
    /* .img:hover {
      transform: scale(1.25);
    } */
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
