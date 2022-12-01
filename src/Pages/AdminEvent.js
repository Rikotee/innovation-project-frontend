import '../components/style.css'
import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro'
import Button from "../components/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
toast.configure()

const Intro = styled.div`
  margin-top: 2em;
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
    background-color: white;
    border-radius: 20px;
`;

const AdminEvent = () => {

    const adminCheck = useLaunchesAdmin()
    const events = useLaunches()

    var token = localStorage.getItem("token");
    const myObj = JSON.parse(token);
  
    const [subject, setSubject] = useState();
    const [eventTxt, setEventTxt] = useState();

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const handleSubmit = async e => {
      e.preventDefault();
      await addEvent({
        subject,
        eventTxt,
        date
      });

       setTimeout(() => {
        window.location.reload(false); 
        }, 1000);
      
    }

    const [list=events, setList] = React.useState()

    function removeList(id) {
      deleteEvent(id)
      const newList = list.filter((l) => l.id !== id)
      setList(newList);
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
        <div>
            <Link to="/admin"><button className="adminButtons">Return to Admin Page</button></Link>
        </div>

    <div className="feedback-wrapper">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" required="required" onChange={u => setSubject(u.target.value)} maxLength={50}/>
        </label>

        <label>
          <p>Event</p>
          <input type="text" required="required" onChange={e => setEventTxt(e.target.value)} maxLength={2000}/>
        </label>

        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>
        </div>

        </form>
        </div>


        <h1>Events</h1>
        <div className="list-container-f">
        <ul className="feedback-list">
          {
            list.map (content =>(
                <li>
            <span><strong>Subject:</strong> {content.subject}</span>
            <span><strong>Event:</strong> {content.event}</span>
            <span><strong>Date:</strong> {content.date}</span>
                <span onClick={()=> removeList(content.id)} style={{marginLeft: "10px", color: "red", cursor: "pointer"}}>x</span>
              </li>
            ))
          }
        </ul>
            </div>
        </Intro>
        )
    };
};

const addEvent = async (credentials) => {
    const subject = credentials.subject
    const eventTxt = credentials.eventTxt
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
       mutation AddEvent {
        addEvent(subject: "${subject}", event: "${eventTxt}", date: "${date}") {
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
    const [events, setEvents] = React.useState([]);
  
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
      .then(data => setEvents(data.data.user.admin))
    }, []);
  
    return events;
  };

  const useLaunches = () => {
    const [events, setEvents] = React.useState([]);

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
          events {
              id
              subject
              event
              date
          }
        }
        `})
      })
      .then((response) => response.json())
/*       .then((data) => console.log(data)); */
      .then(data => setEvents(data.data.events))
    }, []);

    return events;
};

const deleteEvent = async (id) => {
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
       mutation DeleteEvent {
        deleteEvent(id: "${id}") {
        id  
        }
      }
       `
     }),
   };
   try {
     fetch("http://localhost:3000/graphql", options);
   } catch (e) {
     console.log(e);
     return false;
   }
  };

export default AdminEvent;