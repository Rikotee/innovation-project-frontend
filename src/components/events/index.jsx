import React from 'react'
import '../feedback-style.css'

const EventsList = (props) => {
  return (
    <div>
    <h1>Events</h1>

    <ul className="feedback-list">
      {
        props.data.map (content =>(
          <div  className='news'>
          <li>
          <div class="cat">{content.eventdate}</div>
            <div class="title">
						<h3>{content.subject}</h3>
					</div>
					<p class="description">
						{content.event}
					</p>
          <p class="more">
						tap for more
					</p>
          </li>
          </div>
        ))
      }
    </ul>
</div>
  );
}

export default EventsList;