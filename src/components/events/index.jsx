import React from 'react'
import '../feedback-style.css'

const EventsList = (props) => {
  return (
    <div>
    <h1>Events</h1>

    <ul className="feedback-list">
      {
        props.data.map (content =>(
          <li>
            <span><strong>Subject:</strong> {content.subject}</span>
            <span><strong>Event:</strong> {content.event}</span>
          </li>
        ))
      }
    </ul>
</div>
  );
}

export default EventsList;