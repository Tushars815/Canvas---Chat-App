import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/welcome1.gif";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <div className="logout-header">
        <Logout />
      </div>
      <img src={Robot} alt="" />
      <h1>
        नमस्ते, <span>{userName}!</span>
      </h1>
      <h3>Step into a Chatting Arena</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  flex-direction: column;
  // transition: 1s ease-in-out;
  img {
    height: 20rem;
    // transition: 1s ease-in-out;
    border: 2px solid black;
  }
  h1 {
    font-family: "Yatra One", system-ui;
    font-size: 3rem;
    text-shadow: 0 0 55px #050000, 0 0 18px #000050;
  }
  h3 {
    text-shadow: 0 0 55px #050000, 0 0 18px #000050;
    font-size: 1.5rem;
  }
  span {
    color: #aae147;
  }
  .logout-header {
    position: absolute;
    top: 12px;
    right: 32px;
  }
`;
