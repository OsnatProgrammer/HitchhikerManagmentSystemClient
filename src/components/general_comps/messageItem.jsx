import React, { useState } from 'react';
import axios from 'axios';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER, doApiMethod } from '../services/apiService';

export default function MessageItem(props) {
  const [status, setStatus] = useState(props.message.status);

  const handleClick = async () => {
    if (!status) { // Only update if the status is currently false
      try {
        // Make an API request to update the status on the server

        const url=API_URL +`/messages/changeMessageStatus/${props.message._id}`;
        const response = await doApiMethod(url,"PATCH");
        //אפשרות שניה
        // await axios.patch(API_URL +`/messages/changeMessageStatus/${props.message._id}`);
        console.log("try")
        // Update the status in the client component state
        setStatus(true);
      } catch (error) {
        console.log('Failed to update status:', error);
      }
    }

   
  };

  let message = props.message;

  return (
    <tr key={message._id} onClick={handleClick}>
      <td>{new Date(message.date_created).toLocaleDateString()}</td>
      <td>{new Date(message.date_created).toLocaleTimeString()}</td>
      <td>{message.user_idReceive}</td>
      <td>{message.messageDetails}</td>
      <td>{message.rides_id}</td>
      <td>{JSON.stringify(status)}</td>
    </tr>
  );
}
