import React, { useState } from "react";
import '../components/style.css'
import EventsList from "../components/events";

const Home = () => {

  const events = useLaunches()

   // State with list of all checked item
   const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(updatedList);
     };
       
  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

   const checkList = [
    {id: 1, name: "Events"},
    {id: 2, name: "News"},
    {id: 3, name: "HSL"},
  ];

/*   const listItems = checked.map((widgetList)=>{
    return <li>{widgetList}</li>;   
  }); */

  const eventWidget = (checked) =>{
    if (checked.includes('Events')) {
      return <div><EventsList data={events} /></div>;  
    }
  };
 
  return (
    <div className="app">

<div className="checkList">
    <div className="title">Your WidgetList:</div>
    <div className="list-container">
      {checkList.map((item, index) => (
        <div key={index}>
          <input value={item.name} type="checkbox" onChange={handleCheck} />
          <span className={isChecked(item.name)}>{item.name}</span>
        </div>
      ))}
    </div>

  </div>

{/*      <ul> {listItems} </ul> */}
    <ul> {eventWidget(checked)} </ul>

{/*       <div>
        <EventsList data={events} />
      </div> */}

    </div>
  );
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

export default Home;