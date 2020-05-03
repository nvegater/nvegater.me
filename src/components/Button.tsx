import React, {FC} from "react";
import styled from "styled-components";
import axios from "axios";

export enum ButtonHandle {
  logout
}

interface ButtonProps {
  name: string;
  buttonHandle: ButtonHandle;
  setIsLoggedIn: (login: boolean) => void;
}

const StyledButton = styled.div`
.border-box {
    box-sizing: border-box;
}

.ba {
    border-style: solid;
    border-width: 1px;
}

.flex {
    display: flex;
}

.inline-flex {
    display: inline-flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.w1 {
    width: 1rem;
}

.black {
    color: #000;
}

.hover-white:hover {
    color: #fff;
}

.hover-white:focus {
    color: #fff;
}

.hover-bg-black:hover {
    background-color: #000;
}

.hover-bg-black:focus {
    background-color: #000;
}

.pa3 {
    padding: 1rem;
}

.pa4 {
    padding: 2rem;
}

.pl1 {
    padding-left: .25rem;
}

.pr1 {
    padding-right: .25rem;
}

.mr4 {
    margin-right: 2rem;
}

.no-underline {
    text-decoration: none;
}

.f5 {
    font-size: 1rem;
}

.bg-animate, .bg-animate:hover, .bg-animate:focus {
    transition: background-color .15s ease-in-out;
}
`

const Button: FC<ButtonProps> = ({name, buttonHandle, setIsLoggedIn}) => {

  const handleLogout = () => {
    if (buttonHandle === ButtonHandle.logout) {
        setIsLoggedIn(false);
        axios.post('http://127.0.0.1:8001/authapp/token/logout/').then((res: any) => {
        console.log(res);
      }).catch((error) => console.log(error))
    }
  }
  return (
    <StyledButton>
      <div className="flex items-center justify-center pa4">
        <button
          className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
          onClick={handleLogout}
        >
          <span className="pl1">{name}</span>
        </button>
      </div>
    </StyledButton>

  );
}

export default Button;
