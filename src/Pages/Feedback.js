import React, { useState } from "react";
import PropTypes from 'prop-types';
import Registration from "./Registration";
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

const Feedback = ({ setToken }) => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <Intro>
    <div className="login-wrapper">
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" onChange={u => setUserName(u.target.value)} maxLength={20}/>
        </label>
        <label>
          <p>Description</p>
          <input type="password" onChange={e => setPassword(e.target.value)} maxLength={20}/>
        </label>
        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>

        </div>
      </form>
    </div>
        </Intro>
  )
}

 const loginUser = async (credentials) => {
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
      {
        login(username: "${username}", password: "${password}") {
          id
          token
        }
      }
      `
    
    }),
  };
  try {
    const response = await fetch("http://localhost:3000/graphql", options);
    const json = await response.json();
    //console.log(json.data.login)
    if(json.data.login == null){
      toast("check your username or password!")
      return json.data.login;
    }else{
      return json.data.login;
    }
  } catch (e) {
    console.log("error: ", e);
    return false;
  }
};

Feedback.propTypes = {
  setToken: PropTypes.func
}

export default Feedback;