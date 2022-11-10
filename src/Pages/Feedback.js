import React, { useState } from "react";
import PropTypes from 'prop-types';
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

const Feedback = () => {

  const [subject, setSubject] = useState();
  const [feedbackTxt, setFeedbackTxt] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await sendFeedback({
      subject,
      feedbackTxt,

    });
  }

  return(
    <Intro>
    <div className="feedback-wrapper">
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" onChange={u => setSubject(u.target.value)} maxLength={20}/>
        </label>
        <label>
          <p>Description</p>
          <input type="text" onChange={e => setFeedbackTxt(e.target.value)} maxLength={20}/>
        </label>
        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>

        </div>
      </form>
    </div>
        </Intro>
  )
}

 const sendFeedback = async (credentials) => {
   const subject = credentials.subject
   const feedbackTxt = credentials.feedbackTxt

   var token = localStorage.getItem("token");
   const myObj = JSON.parse(token);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${myObj.token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: 
      `
      mutation addFeedback {
        addFeedback(subject: "${subject}", feedback: "${feedbackTxt}") {
          id
        }
      }
      `
    }),
  };
  try {
    const response = await fetch("http://localhost:3000/graphql", options);
    const json = await response.json();
    //console.log(json.data.login)
    if(json == null){
      toast("Something went wrong!")
      //return json.data.login;
    }else{
      toast("Feedback sent!")
      console.log(json)
      //return json.data.login;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

Feedback.propTypes = {
  setToken: PropTypes.func
}

export default Feedback;