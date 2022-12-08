import React from 'react'
import '../feedback-style.css'

/* The base for news widgets*/
const NewsList = (props) => {
  return (
    <div>
    <h1>News</h1>

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
						{content.new}
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

export default NewsList;