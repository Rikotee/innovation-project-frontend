import React, { useState } from "react"
import styled, { css } from 'styled-components/macro'
import Button from "../components/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Intro = styled.div`
  margin-top: 2em;
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
`;

const Registration = () => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({
      username,
      password
    });

  };

  return(
    <Intro>
    <div className="login-wrapper">
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
          id="username"
          type="text"
          onChange={u => setUserName(u.target.value)} maxLength={20}/>
        </label>
        <label>
          <p>Password</p>
          <input
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)} maxLength={20}/>
        </label>
        <div>
        <Button
        disabled={!username || !password}
        type="submit"
        css={btnCSS}>Register</Button>
        </div>
      </form>
    </div>
    </Intro>
  )
};

 const registerUser = async (credentials) => {
   const username = credentials.username
   const password = credentials.password
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: 
      `
      mutation RegisterUser {
        registerUser(username: "${username}", password: "${password}") {
          id
          username
        }
      }
      `
    
    }),
  };
  try {
    const response = await fetch("http://localhost:3000/graphql", options);
    const json = await response.json();
    // console.log(json)
    if(json.data.registerUser == null){
      toast("Try another username or password!")
    }else{
      toast("Your username is now registered!")
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};


export default Registration;