import '../components/style.css'
import React, { useState } from "react";

  const nearStationsAndDepertures = [];
  let nextId = 0;

const HslWidget = () => {

  const [stopId, setStopId] = useState('');
  const [stations, setStations] = useState([]);

  const results = () => {

let i = 0;

while (i < nearStationsAndDepertures[0].data.nearest.edges.length) {
  
            stations.push({
              id: nextId++,
              name: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stop.name,
              distance: nearStationsAndDepertures[0].data.nearest.edges[i].node.distance,
              stoptime: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].scheduledDeparture,
              shortname: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].trip.route.shortName,
              headsign: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].headsign,
              date: nearStationsAndDepertures[0].data.nearest.edges[i].node.place.stoptimes[0].serviceDay,

            })
  i++;
}

stations.sort((a, b) => a.stoptime - b.stoptime);

    setStopId('t')
}

  const nearestStopInfo = () => {

    getLocationStations();
      setTimeout(() => {
      results(); 
      }, 1000);
  }

  nearestStopInfo();

  return (
    <div className="App">
      <header className="App-header">
        <h2>Next departures near you:</h2>

<ul className='no-bullets'>
        {stations.map(stop => (
          <li key={stop.id}>
            <p>{stop.distance}m to {stop.name}</p>
						<p>{stop.shortname} - {stop.headsign}</p>
						<p>{secondsToTime(stop.stoptime)}</p>
            <p> ---------- </p>
            </li>
        ))}
      </ul> 

      </header>
    </div>
  );

}

// this changes seconds to hours and minutes
const secondsToTime = (s) => {
  var date = new Date(0);
  date.setSeconds(s); // specify value for SECONDS
  var timeString = date.toISOString().substring(11, 19);

  return timeString
};

// this will find users location
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

// this will fetch nearest stations in 400m from the user
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

};

export default HslWidget;