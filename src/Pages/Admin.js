import React, {useState} from "react";
import styled from 'styled-components/macro'
import '../components/feedback-style.css'
import { Link } from "react-router-dom";

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const Admin = () => {

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

          <div>
            <Link to="/adminfeedback" className="btn btn-primary">Check Feedbacks</Link>
          </div>

          <div>
            <Link to="/adminevent" className="btn btn-primary">Create Event</Link>
          </div>

      </Intro>
    )
  }
}

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