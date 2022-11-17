import React from "react";
import '../components/style.css'
import EventsList from "../components/events";
import WidgetSelector from "../components/widgetSelector";


const Home = () => {

  const events = useLaunches()

   const checkList = [
    {id: 1, name: "Events"},
    {id: 2, name: "News"},
    {id: 3, name: "HSL"},
  ];
 
  return (
    <div className="app">

      <div>
        <WidgetSelector data={checkList} />
      </div>

      <div>
        <EventsList data={events} />
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