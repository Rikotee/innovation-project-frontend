import React, {useState} from "react";
import styled from 'styled-components/macro'
import '../components/feedback-style.css'

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const Admin = () => {

  const feedbacks = useLaunches()
  const adminCheck = useLaunchesAdmin()

  const [list=feedbacks, setList] = React.useState()

  function removeList(id) {
    deleteFeedback(id)
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
        <h1>Feedbacks</h1>
        <div className="list-container-f">

        <ul className="feedback-list">
          {
            list.map (content =>(
              <li>
                <span><strong>Subject:</strong> {content.subject}</span>
                <span><strong>Feedback:</strong> {content.feedback}</span>
                <span><strong>Email:</strong> {content.email}</span>
                <span onClick={()=> removeList(content.id)} style={{marginLeft: "10px", color: "red", cursor: "pointer"}}>x</span>
              </li>
            ))
          }
        </ul>
    </div>
    </div>
      </Intro>
    )
  }
}

const useLaunches = () => {
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
          feedbacks {
              id
              subject
              feedback
              email
          }
        }
        `})
      })
      .then((response) => response.json())
/*       .then((data) => console.log(data)); */
      .then(data => setFeedbacks(data.data.feedbacks))
    }, []);

    return feedbacks;
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

const deleteFeedback = async (id) => {
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
     mutation DeleteFeedback {
      deleteFeedback(id: "${id}") {
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

export default Admin;