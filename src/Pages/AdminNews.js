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

const AdminNews = () => {

    const adminCheck = useLaunchesAdmin()
    const news = useLaunches()

    var token = localStorage.getItem("token");
    const myObj = JSON.parse(token);
  
    const [subject, setSubject] = useState();
    const [newsTxt, setNewsTxt] = useState();

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const handleSubmit = async e => {
      e.preventDefault();
      await addNews({
        subject,
        newsTxt,
        date
      });

        setTimeout(() => {
        window.location.reload(false); 
        }, 1000); 
      
    }

    const [list=news, setList] = React.useState()

    function removeList(_id) {
      deleteNews(_id)
      const newList = list.filter((l) => l._id !== _id)
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
      <h1>Create News</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" required="required" onChange={u => setSubject(u.target.value)} maxLength={50}/>
        </label>

        <label>
          <p>News</p>
          <input type="text" required="required" onChange={e => setNewsTxt(e.target.value)} maxLength={2000}/>
        </label>

        <div>
          <Button type="submit" css={btnCSS}>Submit</Button>
        </div>

        </form>
        </div>


        <h1>News</h1>
        <div className="list-container-f">
        <ul className="feedback-list">
          {
            list.map (content =>(
                <li>
            <span><strong>Subject:</strong> {content.subject}</span>
            <span><strong>News:</strong> {content.news}</span>
            <span><strong>Date:</strong> {content.date}</span>
                <span onClick={()=> removeList(content._id)} style={{marginLeft: "10px", color: "red", cursor: "pointer"}}>x</span>
              </li>
            ))
          }
        </ul>
            </div>
        </Intro>
        )
    };
};

const addNews = async (credentials) => {
    const subject = credentials.subject
    const newsTxt = credentials.newsTxt
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
       mutation Mutation {
        createNew(subject: "${subject}", news: "${newsTxt}", date: "${date}") {
        _id  
        }
      }
       `
     }),
   };
   try {
     const response = await fetch("https://friendly-maisie-hakalatoni87.koyeb.app/graphql", options);
     const json = await response.json();
     if(json == null){
       toast("Something went wrong!")
     }else{
       toast("News added!")
       console.log(json)
     }
   } catch (e) {
     console.log(e);
     return false;
   }
 };

 const useLaunchesAdmin = () => {
    const [news, setNews] = React.useState([]);
  
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
      .then(data => setNews(data.data.user.admin))
    }, []);
  
    return news;
  };

  const useLaunches = () => {
    const [news, setNews] = React.useState([]);

    React.useEffect(() => {
      var token = localStorage.getItem("token");
      const myObj = JSON.parse(token);

      fetch("https://friendly-maisie-hakalatoni87.koyeb.app/graphql", {
      method: "POST",
      headers: {Authorization: `Bearer ${myObj.token}`,
      "Content-Type": "application/json" },
      body: JSON.stringify({ query: 
        `
        {
          getNews {
            _id
            date
            news
            subject
          }
        }
        `})
      })
      .then((response) => response.json())
/*       .then((data) => console.log(data)); */
      .then(data => setNews(data.data.getNews))
    }, []);

    return news;
};

const deleteNews = async (id) => {
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
       mutation DeleteNews {
        deleteNews(id: "${id}") {
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

export default AdminNews;