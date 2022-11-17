import React, { useState } from "react";
import '../components/style.css'


const Home = () => {


  const events = useLaunches()
  console.log(events)

   // State with list of all checked item
   const [checked, setChecked] = useState([]);
   const checkList = [
    {id: 1, name: "Events"},
    {id: 2, name: "News"},
    {id: 3, name: "HSL"},
  ];
 
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
 
   // Generate string of checked items
   const checkedItems = checked.length
     ? checked.reduce((total, item) => {
         return total + ", " + item;
       })
     : "";
 
   // Return classes based on whether item is checked
   var isChecked = (item) =>
     checked.includes(item) ? "checked-item" : "not-checked-item";

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

      <div>
        {`Items checked are: ${checkedItems}`}
      </div>

      <ul>
        {
          checked.map((todo) => {
            return <li key={todo.id}> {todo.name}
            <span onClick={()=> handleCheck(todo.id)} style={{marginLeft: "10px", color: "red", cursor: "pointer"}}>x</span>
            </li>
          })
        }
      </ul>

      <div>
        <h1>Events</h1>
        <div className="list-container-f">
        <ul className="feedback-list">
          {
            events.map (content =>(
              <li>
                <span><strong>Subject:</strong> {content.subject}</span>
                <span><strong>Event:</strong> {content.event}</span>
              </li>
            ))
          }
        </ul>
    </div>
    </div>

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