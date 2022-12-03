import React from 'react'
import '../feedback-style.css'

const NewsList = (props) => {
  return (
    <div>
    <h1>News</h1>

    <ul className="feedback-list">
      {
        props.data.map (content =>(
          <li>
            <span><strong>Headline:</strong> {content.subject}</span>
            <span><strong>News:</strong> {content.news}</span>
            <span><strong>Date:</strong> {content.date}</span>
          </li>
        ))
      }
    </ul>
</div>
  );
}

export default NewsList;