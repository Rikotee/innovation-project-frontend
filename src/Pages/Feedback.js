import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro'
import Button from "../components/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
toast.configure()

const Intro = styled.div`
  margin-top: 2em;
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
`;

let email = ""

const Feedback = () => {
  const form = useRef();

/*   const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zu1bwg8",
        "template_yu0sc8v",
        form.current,
        "aIR9zKHg7S8xEqWPi"
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
  }; */

  var token = localStorage.getItem("token");
  const myObj = JSON.parse(token);

  const emailT = myObj.username;

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [subject, setSubject] = useState();
  const [feedbackTxt, setFeedbackTxt] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await sendFeedback({
      subject,
      feedbackTxt,
      email

    });

    emailjs
    .sendForm(
      "service_zu1bwg8",
      "template_yu0sc8v",
      form.current,
      "aIR9zKHg7S8xEqWPi"
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
          <p>Description</p>
          <input name="message" type="text" required="required" onChange={e => setFeedbackTxt(e.target.value)} maxLength={2000}/>
        </label>

<div>
        <Checkbox
        label="Add my email"
        value={checked}
        onChange={handleChange}
      />

      <p>{emailT}</p>
       </div>   
        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>

        </div>
      </form>

{/*       <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form> */}


    </div>
        </Intro>
  )
}

 const sendFeedback = async (credentials) => {
   const subject = credentials.subject
   const feedbackTxt = credentials.feedbackTxt
   const email = credentials.email

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
        addFeedback(subject: "${subject}", feedback: "${feedbackTxt}", email: "${email}") {
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
      //console.log(json)
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