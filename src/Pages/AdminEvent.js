import '../components/style.css'
import React, { useState, useRef } from "react";
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

const AdminEvent = () => {

    const adminCheck = useLaunchesAdmin()

    var token = localStorage.getItem("token");
    const myObj = JSON.parse(token);
  
    const [subject, setSubject] = useState();
    const [eventTxt, setEventTxt] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      await addEvent({
        subject,
        eventTxt,
      });
  
    }

    if(adminCheck===false){
        return(
          <Intro>
            <p>
              Not Authorized
            </p>
          </Intro>
        )
      }else{
        return(
    <Intro>
    <div className="feedback-wrapper">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" required="required" onChange={u => setSubject(u.target.value)} maxLength={50}/>
        </label>

        <label>
          <p>event</p>
          <input type="text" required="required" onChange={e => setEventTxt(e.target.value)} maxLength={2000}/>
        </label>

        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>
        </div>

        </form>
        </div>
        </Intro>
        )
    };
};

const addEvent = async (credentials) => {
    const subject = credentials.subject
    const eventTxt = credentials.eventTxt

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
       mutation AddEvent {
        addEvent(subject: "${subject}", event: "${eventTxt}") {
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
       toast("Event added!")
       //console.log(json)
     }
   } catch (e) {
     console.log(e);
     return false;
   }
 };

 const useLaunchesAdmin = () => {
    const [feedbacks, setFeedbacks] = React.useState([]);
  
    React.useEffect(() => {
      var token = localStorage.getItem("token");
      const myObj = JSON.parse(token);
  
      fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {Authorization: `Bearer ${myObj.token}`,
      "Content-Type": "application/json" },
      body: JSON.stringify({ query: 
        `
        {
        user(id: "${myObj.id}") {
         admin
        }
       }
        `})
      })
      .then((response) => response.json())
      .then(data => setFeedbacks(data.data.user.admin))
    }, []);
  
    return feedbacks;
  };

export default AdminEvent;