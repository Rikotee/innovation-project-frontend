import React from "react";
import styled from 'styled-components/macro'

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;



const fakedata = {
  "data": {
    "feedbacks": [
      {
        "email": "teeee@knk.com",
        "feedback": "hdzhzrfjgyzretgjfhfhgjfh",
        "id": "636d2c5207cef5e73f1206d4",
        "subject": "front test"
      },
      {
        "email": "",
        "feedback": "hdzhzrfjgyzretgjfhfhgjfh",
        "id": "636d2c6907cef5e73f1206d6",
        "subject": "front test 2"
      },
      {
        "email": "",
        "feedback": "uryjukiyyttyu",
        "id": "636e078b98040cb0e9894186",
        "subject": "front test 3"
      },
      {
        "email": "undefined",
        "feedback": "jgxhjghktguh",
        "id": "636e07a398040cb0e9894188",
        "subject": "front test 4"
      },
      {
        "email": "undefined",
        "feedback": "uryh",
        "id": "636e3c3b1f7d8c3dbc1d3c85",
        "subject": "iuj"
      },
      {
        "email": null,
        "feedback": "tekstiä sujytuyyyfgjbmk,jsryj",
        "id": "636e42681f7d8c3dbc1d3c88",
        "subject": "valitus7"
      },
      {
        "email": null,
        "feedback": "tekstiä sujytuyyyfgjbmk,jsryj",
        "id": "636e50890373f1dd4e0c3d07",
        "subject": "valitus999"
      }
    ]
  }
}


const Admin = () => {

  const feedbacks = useLaunches()
  console.log(feedbacks)

  

    return(
<h1>Parking</h1>
/*       <Intro>
        <div>
             Feedbacks: 
             <br />
             <br />
             <ul>
              <div> {feedbacks.map(feedback => (
              <li key={feedback.subject} >{feedback.feedback} - : {feedback.email}</li>
            ))} </div>
            </ul>
        </div>
      </Intro> */
    )
}

const useLaunches = () => {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
          console.log("2")
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
        `
      })
      .then(response => response.json())
      
      .then(data => setUsers(data.feedbacks))
    }, []);
console.log(users)
    return users;
    
  });

};





export default Admin;