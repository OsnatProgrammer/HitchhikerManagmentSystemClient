

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL } from '../services/apiService';
import classes from './General.module.css';



export default function MessageItem(props) {
  const [status, setStatus] = useState(props.message.status);
  const navigate = useNavigate();


  const handleClick = async () => {
    if (!status) {
      try {
        // Make an API request to update the status on the server
        const url = `${API_URL}/messages/changeMessageStatus/${props.message._id}`;
        await doApiMethod(url, 'PATCH');

        // Update the status in the client component state
        setStatus(true);

        // Open message details in a new page
      } catch (error) {
        console.log('Failed to update status:', error);
      }
    }
    navigate(`/user/message-details/${message._id}`, { state: { message: message } });

  };

  let message = props.message;

  const rowStyles = {
    fontWeight: status ? 'normal' : 'bold',
    background: status ? 'red' : 'blue !important',
  };

  return (
    <tr key={message._id} onClick={handleClick} style={rowStyles} className={status ? '' : 'highlighted-row'}>
      <td>{new Date(message.date_created).toLocaleDateString()}</td>
      <td>{new Date(message.date_created).toLocaleTimeString()}</td>
      <td>{message.user_idReceive}</td>
      <td>{message.messageDetails}</td>
      <td>{message.rides_id}</td>
      <td>{JSON.stringify(status)}</td>
    </tr>
  );
}

