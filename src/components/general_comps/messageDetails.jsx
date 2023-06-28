import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, doApiGet } from '../services/apiService';
import { useLocation } from 'react-router-dom';
import NewMessage from './newMessage';

export default function MessageDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const url = `${API_URL}/messages/getMessageByMessageId/${id}`;
        const response = await doApiGet(url);
        console.log(response, "resp");
        setMessage(response.data);
      } catch (error) {
        console.log('Failed to fetch message details:', error);
      }
    };

    fetchMessageDetails();
  }, [id]);

  if (!message) {
    return <p>Loading...</p>;
  }

  const handleReplyMessage = () => {
    setShowNewMessage(true);
  };

  return (
    <div className="container">
      <h1>Message Details</h1>
      <p>User Received: {message.user_idReceive}</p>
      <p>Message Details: {message.messageDetails}</p>
      <p>Rides ID: {message.rides_id}</p>
      <p>Status: {message.status ? 'True' : 'False'}</p>

      <button className="btn btn-dark m-2">BACK</button>

      {showNewMessage & message.user_idSend!=0? (
        <NewMessage message={message} />
      ) : (
        <button className="btn btn-dark me-2" onClick={handleReplyMessage}>
          + REPLY MESSAGE
        </button>
      )}
    </div>
  );
}
