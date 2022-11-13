import React from 'react'
import '../feedback-style.css'

const FeedbackList = (props) => {
  return (
    <div>
        <h1>Feedbacks</h1>
        <ul className="feedback-list">
          {
            props.data.map (content =>(
              <li>
                <span><strong>Subject:</strong> {content.subject}</span>
                <span><strong>Feedback:</strong> {content.feedback}</span>
                <span><strong>Email:</strong> {content.email}</span>
              </li>
            ))
          }
        </ul>
    </div>
  );
}

export default FeedbackList;