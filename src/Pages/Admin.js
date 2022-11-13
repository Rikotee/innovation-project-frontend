import React from "react";
import styled from 'styled-components/macro'
import FeedbackList from "../components/feedback";

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const Admin = () => {

  const feedbacks = useLaunches()
  const adminCheck = useLaunchesAdmin()

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
      <FeedbackList data={feedbacks} />
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

export default Admin;