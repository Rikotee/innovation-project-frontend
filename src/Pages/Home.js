import React, { useState } from "react";
import '../components/style.css'
import '../App.css'
import EventsList from "../components/events";
import NewsList from "../components/news";
import HslWidget from "./HslWidget";
import Paper from "@material-ui/core/Paper";
import logo from '../components/image/mycampus.png';

const Home = () => {

  const events = useLaunchesEvents()
  const news = useLaunchesNews()
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState('Add widgets');
  const [changeHeight, setChangeHeight] = useState('420');

  // State with list of all checked item
  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheck= (event) => {
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

  const eventWidget = (checked) =>{
    if (checked.includes('Events')) {
      return <div><EventsList data={events} /></div>;  
    }
  };
  const newsWidget = (checked) =>{
    if (checked.includes('News')) {
      return <div><NewsList data={news} /></div>;  
    }
  };
  const hsltWidget = (checked) =>{
    if (checked.includes('HSL')) {
      return <HslWidget></HslWidget>;  
    }
  };
  //Used to hide checkboxes when clicking done
  const handleClick = () => {
    // toggle
    setIsActive(current => !current);
    setButtonText(current => !current);
    setChangeHeight(current => !current);
  };

  return (
    <div className="app">
      <div width='100%'>
      <image>
        <img className="logoImg" src={logo} alt="MyCampus logo"/>
      </image>
      </div>
      <button class="editWidgets"
        onClick={handleClick}
      >
        {buttonText ? 'Edit Widgets' : 'Done'}
      </button>
      <div className="checkList" style={{
          display: isActive ? '' : 'none',
        }}>
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
  
<Paper style={{maxHeight: changeHeight ? 540 : 420 , overflow: 'auto', backgroundColor: 'rgb(28,69,152)'}}>
    <ul> {eventWidget(checked)} </ul>
</Paper>

<Paper style={{maxHeight: changeHeight ? 540 : 420 , overflow: 'auto', backgroundColor: 'rgb(28,69,152)'}}>
    <ul> {newsWidget(checked)} </ul>
</Paper>

    <ul> {hsltWidget(checked)} </ul>
    </div>
  );
};

// for fetching events from the database
const useLaunchesEvents = () => {
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
          date
          eventdate
        }
      }
      `})
    })
    .then((response) => response.json())
    .then(data => setEvents(data.data.events))
  }, []);

  return events;
};

// for fetching news from the database
const useLaunchesNews = () => {
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
        news {
          id
          subject
          new
          date
        }
      }
      `})
    })
    .then((response) => response.json())
    .then(data => setNews(data.data.news))
  }, []);

  return news;
};

export default Home;