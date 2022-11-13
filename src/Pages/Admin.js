import React from "react";
import styled from 'styled-components/macro'

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const sampleJSON = {
  name: "Pluralsight",
  number: 1,
  address: "India",
  website: "https://www.pluralsight.com/"
};

const Admin = () => {

  const feedbacks = useLaunches()



    return(
      <Intro>
        <div>
             Feedbacks received 
             <br />
             <br />
             <ul>
              <div> {feedbacks.map(user => (
              <li key={user.subject} >{user.subject} - feedback: {user.feedback}</li>
            ))} </div>
            </ul>
        </div>
      </Intro>

    )
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

export default Admin;