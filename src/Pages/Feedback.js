import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro'
import Button from "../components/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
toast.configure()

const Intro = styled.div`
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
    background-color: white;
    border-radius: 20px;
`;

const addCSS = css`
    margin-top: 1em;
`;

let email = ""

const Feedback = () => {

  const form = useRef();
  const [checked, setChecked] = React.useState(false);
  const [subject, setSubject] = useState();
  const [feedbackTxt, setFeedbackTxt] = useState();

  var token = localStorage.getItem("token");
  const myObj = JSON.parse(token);

  const handleChange = () => {
    setChecked(!checked);
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const handleSubmit = async e => {
    e.preventDefault();
    await sendFeedback({
      subject,
      feedbackTxt,
      email,
      date
    });

    // This will send email notification if user 
    // check checkbox
    if(checked===true){
          emailjs
    .sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then(
      (result) => {
        console.log(result.text);
        console.log("message sent");
      },
      (error) => {
        console.log(error.text);
      }
    );
    }
  }

  return(
    <Intro>
    <div className="feedback-wrapper">
      <h1>Feedback</h1>
      <form ref={form} onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input name="user_name" type="text" required="required" onChange={u => setSubject(u.target.value)} maxLength={50}/>
        </label>

        <label>
          <p>Message</p>
          <input name="message" type="text" required="required" onChange={e => setFeedbackTxt(e.target.value)} maxLength={2000}/>
        </label>

        <label className="email">
          <p>Email</p>
          <input name="user_email" type="text" value={myObj.username} onChange={e => setFeedbackTxt(e.target.value)} maxLength={2000}/>
        </label>

<div css={addCSS}>
        
        <Checkbox
        label="Add my email and send notification to app handlers"
        value={checked}
        onChange={handleChange}
        
      />

       </div>   
        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>
        </div>

      </form>
    </div>
        </Intro>
  )
}

// This will send feedback to database
const sendFeedback = async (credentials) => {
  const subject = credentials.subject
  const feedbackTxt = credentials.feedbackTxt
  const email = credentials.email
  const date = credentials.date

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
       addFeedback(subject: "${subject}", feedback: "${feedbackTxt}", email: "${email}", date: "${date}") {
         id
       }
     }
     `
   }),
 };
 try {
   const response = await fetch("http://localhost:3000/graphql", options);
   const json = await response.json();
   if(json == null){
     toast("Something went wrong!")
   }else{
     toast("Feedback sent!")
   }
 } catch (e) {
   console.log(e);
   return false;
 }
};

Feedback.propTypes = {
 setToken: PropTypes.func
}

const Checkbox = ({ label, value, onChange }) => {
 var token = localStorage.getItem("token");
 const myObj = JSON.parse(token);

 if(value === true){
   email = myObj.username;
 }else{
   email = ""
 }
 return (
   <label>
     <input type="checkbox" checked={value} onChange={onChange} />
     {label}
   </label>
 );
};

export default Feedback;