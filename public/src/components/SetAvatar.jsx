import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader3.gif";
import tick from "../assets/check-mark.png";
import refresh from "../assets/circular.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [reloadFlag, setReloadFlag] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  const handleClick = (event) => {
    console.log(reloadFlag);
    setIsLoading(false);
    setReloadFlag(!reloadFlag);
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 3; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, [reloadFlag]);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div class="container">
            <div className="title-container">
              <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="btn-container">
              <button onClick={setProfilePicture} className="submit-btn">
                <img src={tick} alt="" />
                Accept
              </button>
              <button onClick={handleClick} className="submit-btn">
                <img src={refresh} alt="" />
                Try More
              </button>
            </div>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  // background-color: #131324;
  background-image: url("https://static.vecteezy.com/system/resources/previews/017/396/946/non_2x/colorful-graffiti-wall-art-background-street-art-hip-hop-urban-illustration-background-seamless-amazing-graffiti-art-background-vector.jpg");
  height: 100vh;
  width: 100vw;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    backdrop-filter: blur(5px);
    border: 10px solid black;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  .loader {
    max-inline-size: 100%;
    border-radius: 100%;
    height: 350px;
    border: 2px solid black;
  }

  .title-container {
    h1 {
      color: white;
      text-shadow: 0 0 55px #050000, 0 0 18px #050000;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid black;
      /* padding: 0.4rem; */
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      img {
        height: 6rem;
        /* transition: 0.5s ease-in-out; */
        &:hover {
          cursor: pointer;
        }
      }
    }
    .selected {
      border: 0.4rem solid #073ebc;
    }
  }
  .btn-container {
    display: flex;
  }
  .submit-btn {
    margin-right: 10px;
    background-color: #073ebc;
    color: white;
    padding: 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.35rem;
    text-transform: uppercase;
    transition: 0.2s ease-in-out;
    &:hover {
      /* background-color: #073ebc; */
      box-shadow: 1px 1px 5px black;
    }
    img {
      height: 1.5rem;
      /* width: 1.25rem; */
      margin-right: 7px;
    }
  }
`;
