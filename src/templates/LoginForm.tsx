import React, {FC, useState} from "react";
import styled from "styled-components";
import {theme} from "../styles/theme";
import axios from 'axios';

const TachyonsStyles = styled.div`
.ba {
    border-style: solid;
    border-width: 1px;
}

.b--black {
    border-color: #000;
}

.b--transparent {
    border-color: transparent;
}

.db {
    display: block;
}

.dib {
    display: inline-block;
}

.b {
    font-weight: bold;
}

.fw6 {
    font-weight: 600;
}

.input-reset {
    -webkit-appearance: none;
       -moz-appearance: none;
}

.input-reset::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.lh-copy {
    line-height: 1.5;
}

.link {
    text-decoration: none;
    transition: color .15s ease-in;
}

.link:link, .link:visited {
    transition: color .15s ease-in;
}

.link:hover {
    transition: color .15s ease-in;
}

.link:active {
    transition: color .15s ease-in;
}

.link:focus {
    transition: color .15s ease-in;
    outline: 1px dotted currentColor;
}

.w-100 {
    width: 100%;
}

.black-80 {
    color: rgba(0, 0, 0, .8);
}

.black {
    color: #000;
}

.bg-transparent {
    background-color: transparent;
}

.hover-white:hover {
    color: black;
}

.hover-white:focus {
    color: black;
}

.hover-bg-black:hover {
    background-color: ${theme.colors.themeLighterAlt};
}

.hover-bg-black:focus {
    background-color: ${theme.colors.themeLighterAlt};
}

.pa0 {
    padding: 0;
}

.pa2 {
    padding: .5rem;
}

.pa4 {
    padding: 2rem;
}

.pv2 {
    padding-top: .5rem;
    padding-bottom: .5rem;
}

.ph0 {
    padding-left: 0;
    padding-right: 0;
}

.ph3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.ma0 {
    margin: 0;
}

.mt3 {
    margin-top: 1rem;
}

.mv3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.mh0 {
    margin-left: 0;
    margin-right: 0;
}

.f4 {
    font-size: 1.25rem;
}

.f6 {
    font-size: .875rem;
}

.measure {
    max-width: 30em;
}

.center {
    margin-right: auto;
    margin-left: auto;
}

.dim {
    opacity: 1;
    transition: opacity .15s ease-in;
}

.dim:hover, .dim:focus {
    opacity: .5;
    transition: opacity .15s ease-in;
}

.dim:active {
    opacity: .8;
    transition: opacity .15s ease-out;
}

.grow {
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform .25s ease-out;
}

.grow:hover, .grow:focus {
    transform: scale(1.05);
}

.grow:active {
    transform: scale(.9);
}

.pointer:hover {
    cursor: pointer;
}
`;

enum LoginOrSignUp {
  login,
  signUp
}

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginForm: FC<LoginProps> = ({setIsLoggedIn}) => {

  const [loginOrSignUp, setLoginOrSignUp] = useState<LoginOrSignUp>(LoginOrSignUp.login);
  const messageLoginOrSignUp: string = loginOrSignUp === LoginOrSignUp.login ? 'Log in' : 'Sign Up';

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(event: any) {
    console.log("Handling Submit with username: ", email, " and password: ", password);
    event.preventDefault();

    if (loginOrSignUp === LoginOrSignUp.login) {
      axios.post('http://127.0.0.1:8001/authapp/token/login', {
        email: email,
        username: email,
        password: password
      }).then((res: any) => {

        console.log(res)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toDateString());
        setIsLoggedIn(true);
      }).catch((error) => console.log(error))
    } else {
      axios.post('http://127.0.0.1:8001/authapp/users/', {
        email: email,
        username: email,
        password: password
      }).then((res: any) => {

        console.log(res)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toDateString());
        setIsLoggedIn(true);
      }).catch((error) => console.log(error))
    }
  }


  return (
    <TachyonsStyles>
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{messageLoginOrSignUp}</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" type="email"
                     name="email-address" id="email-address" value={email}
                     onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                     type="password" name="password" id="password" value={password}
                     onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                   value={messageLoginOrSignUp} onSubmit={handleSubmit}/>
          </div>
          <div className="lh-copy mt3">
            <div className="f6 link dim black db"
               onClick={() => {
                 if (LoginOrSignUp.signUp === loginOrSignUp) {
                   setLoginOrSignUp(LoginOrSignUp.login)
                 } else {
                   setLoginOrSignUp(LoginOrSignUp.signUp)
                 }
               }}>{loginOrSignUp === LoginOrSignUp.login ? 'Sign up' : 'Log in'}</div>
          </div>
        </form>
      </main>
    </TachyonsStyles>
  )
};

export default LoginForm;
