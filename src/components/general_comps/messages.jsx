
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import MessageItem from './messageItem';
const user = JSON.parse(localStorage.getItem(CURRENT_USER))

export const getMessageByIdSend = async (_idSend) => {
  try {
    const url = API_URL + `/messages/getMessageByIdSend/${_idSend}`;
    const response = await doApiGet(url);
    const messages = response.data;
    console.log("messages", messages);
    return messages;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch messages");
  }
};
export const getMessageByIdReceived = async (_idReceived) => {
  try {
    const url = API_URL + `/messages/getMessageByIdRecive/${_idReceived}`;
    const response = await doApiGet(url);
    const receivedMessages = response.data;
    console.log("receivedMessages", receivedMessages);
    return receivedMessages;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch messages");
  }
};


export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const userId = user._id
        const messagesData = await getMessageByIdSend(userId);
        setMessages(messagesData);
        const messagesReceivedData = await getMessageByIdReceived(userId);
        setReceivedMessages(messagesReceivedData);

      } catch (err) {
        console.log(err);
      }
    }

    fetchMessages();
  }, []);

  // const displayArrInTable=(_arr)=>{

  // }

  return (
    <div className="container">

      <h1>Messages I Got</h1>
      {receivedMessages.length > 0 ? (
        <table id="dtBasicExample" className="table table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>User Received</th>
              <th>MessageDetails</th>
              <th>Rides id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {receivedMessages.map((message) => (
              <MessageItem key={message.id} message={message} />

            ))}
          </tbody>
        </table>
      ) : (
        <p>No Messages available</p>
      )}



      <h1>Messages I Sent</h1>

      {messages.length > 0 ? (
        <table id="dtBasicExample" className="table table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>User Received</th>
              <th>MessageDetails</th>
              <th>Rides id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />

            ))}
          </tbody>
        </table>
      ) : (
        <p>No Messages available</p>
      )}



    </div>
  );
}
