import React from "react";
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
            <Link to="/adminfeedback"><button className="adminButtons">Check Feedbacks</button></Link>
          </div>
          
          <div>
            <Link to="/adminevent"><button className="adminButtons">Create Event</button></Link>
          </div>

          <div>
            <Link to="/adminnews"><button className="adminButtons">Create News</button></Link>
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