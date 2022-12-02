import '../components/style.css'
import React, { useState } from "react";


  const listOfStops = [];
  const nearStationsAndDepertures = [];
  let nextId = 0;


function HslWidget() {

  const [stopId, setStopId] = useState('');
  const [stations, setStations] = useState([]);


/*   const refreshPage = () => {
    window.location.reload(false);
  } */

  const results = () => {

let i = 0;

while (i < nearStationsAndDepertures[0].data.nearest.edges.length) {
  
            stations.push({
              id: nextId++,
              name: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stop.name,
              distance: nearStationsAndDepertures[0].data.nearest.edges[i].node.distance,
              stoptime: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].scheduledDeparture,
              shortname: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].trip.route.shortName,
              longname: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].trip.route.longName,
              headsign: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].headsign,
              date: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].serviceDay,

            })
  i++;
}
            setStopId('t')
}



  const nearestStopInfo = () => {

    getLocationStations();
      setTimeout(() => {
      results(); 
      }, 1000);
  }


  nearestStopInfo();

  console.log(nearStationsAndDepertures)


  return (
    <div className="App">
      <header className="App-header">
        <h2>Next departures near you:</h2>


<ul className='no-bullets'>
        {stations.map(stop => (
          <li key={stop.id}>
            <p>distance: {stop.distance}m</p>
						<p>{stop.name}</p>
						<p>{stop.shortname} - {stop.headsign}</p>
            <p>{stop.longname}</p>
						<p>{secondsToTime(stop.stoptime)}</p>
            <p> ---------- </p>
            </li>
        ))}
      </ul> 


{/*       <ul> {listItems} </ul> */}




      </header>
    </div>
  );

}

const secondsToTime = (s) => {
  var date = new Date(0);
  date.setSeconds(s); // specify value for SECONDS
  var timeString = date.toISOString().substring(11, 19);
/*   console.log(timeString) */
  return timeString
};

/* const toDateTime = (secs) => {
  

const date = new Date(secs * 1000);
var timeString = date.toISOString();

return timeString
  
} */


///////////////////////////////////////////////////////////////////////77


const getLocationStations = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

const showPosition = (position) => {
  return getNearestStationsAndDepertures(position.coords.latitude, position.coords.longitude)
}

 /////////////////////////////////////////////////////7

 const getStopDataById = (stopId) => {

    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: 
      `
      {
        stop(id: "${stopId}") {
          gtfsId
          name
          lat
          lon
          patterns {
            code
            directionId
            headsign
            route {
              gtfsId
              shortName
              longName
              mode
            }
          }
        }
      }
      `
    })
    })

    .then((res) => res.json())
    .then((data) => {
      listOfStops.push(data);
    })
/* .then(() => {
  console.log(listOfStops);
}) */
 };



//////////////////////////////////////////////////////////////////////


const getNearestStationsAndDepertures = async (lat, lon) => {

  fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: 
     `
      {
          nearest(lat: ${lat}, lon: ${lon}, maxDistance: 400, filterByPlaceTypes: DEPARTURE_ROW, maxResults: 20) {
            edges {
              node {
                place {
                  ...on DepartureRow {
                    stop {
                      lat
                      lon
                      name
                    }
                    stoptimes {
                      serviceDay
                      scheduledDeparture
                      realtimeDeparture
                      trip {
                        route {
                          shortName
                          longName
                        }
                      }
                      headsign
                    }
                  }
                }
                distance
              }
            }
          }
        }
     `
    })
  })

  .then((res) => res.json())
  .then((data) => {
    nearStationsAndDepertures.push(data);
  })
/* .then(() => {
console.log(nearStationsAndDepertures);
}) */
};

export default HslWidget;
