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
          <div class="cat">{content.date}</div>
            <div class="title">
						<h3>{content.subject}</h3>
					</div>
					<p class="description">
						{content.event}
					</p>
          <p class="more">
						<p>tap for more</p>
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