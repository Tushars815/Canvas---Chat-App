import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/welcome1.gif";
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
      <img src={Robot} alt="" />
      <h1>
        नमस्ते, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
