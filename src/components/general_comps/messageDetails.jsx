

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL, doApiGet } from '../services/apiService';
// import { useLocation } from 'react-router-dom';
// import NewMessage from './newMessage';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { CURRENT_USER } from '../services/apiService';
// const user = JSON.parse(localStorage.getItem(CURRENT_USER))

// export default function MessageDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate(); // Access the navigate function from React Router
//     const [message, setMessage] = useState(null);
//     const [showNewMessage, setShowNewMessage] = useState(false);

//     useEffect(() => {
//         const fetchMessageDetails = async () => {
//             try {
//                 const url = `${API_URL}/messages/getMessageByMessageId/${id}`;
//                 const response = await doApiGet(url);
//                 console.log(response, "resp");
//                 setMessage(response.data);
//             } catch (error) {
//                 console.log('Failed to fetch message details:', error);
//             }
//         };

//         fetchMessageDetails();
//     }, [id]);

//     if (!message) {
//         return <p>Loading...</p>;
//     }

//     const handleReplyMessage = () => {
//         if (message.user_idSend === "0") {
//             toast.error("You can't reply to system messages!");
//         } else {
//             setShowNewMessage(true);
//         }
//     };

//     const handleBack = () => {
//         navigate('/user/messages'); // Navigate to the Messages component
//     };

//     return (
//         <div className="container shadow col-md-6 my-5 text-danger">
//             <h1 className='font-weight-bold text-center m-3'>Message Details</h1>
//             <p><span className='font-weight-bold'>User Received:</span> {message.user_idReceive}</p>
//             <p><span className='font-weight-bold'>Message Details:</span> {message.messageDetails}</p>
//             <p><span className='font-weight-bold'>Rides ID:</span> {message.rides_id}</p>
//             <p><span className='font-weight-bold'>Status:</span> {message.status ? 'True' : 'False'}</p>
//             <div className='text-center'>
//                 <button className="btn button m-2" onClick={handleBack}>
//                     BACK
//                 </button>



//                 {showNewMessage && message.user_idSend !== "0" ? (
//                     <NewMessage message={message} nav={'/user/messages'} />
//                 ) : (
//                     <button className="btn button me-2" onClick={handleReplyMessage}>
//                         + REPLY MESSAGE
//                     </button>
//                 )}
//                 <ToastContainer />

//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, doApiGet } from '../services/apiService';
import { useLocation } from 'react-router-dom';
import NewMessage from './newMessage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CURRENT_USER } from '../services/apiService';
const user = JSON.parse(localStorage.getItem(CURRENT_USER));

export default function MessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Access the navigate function from React Router
  const [message, setMessage] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const url = `${API_URL}/messages/getMessageByMessageId/${id}`;
        const response = await doApiGet(url);
        console.log(response, 'resp');
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
    if (message.user_idSend === '0') {
      toast.error("You can't reply to system messages!");
    } else {
      setShowNewMessage(true);
    }
  };

  const handleBack = () => {
    navigate('/user/messages'); // Navigate to the Messages component
  };

  return (
    <div className="container shadow col-md-6 my-5 text-danger">
      <h1 className="font-weight-bold text-center m-3">Message Details</h1>
      <p>
        <span className="font-weight-bold">User Received:</span> {message.user_idReceive}
      </p>
      <p>
        <span className="font-weight-bold">Message Details:</span> {message.messageDetails}
      </p>
      <p>
        <span className="font-weight-bold">Rides ID:</span> {message.rides_id}
      </p>
      <p>
        <span className="font-weight-bold">Status:</span> {message.status ? 'True' : 'False'}
      </p>
      <div className="text-center">
        <button className="btn button m-2" onClick={handleBack}>
          BACK
        </button>

        {showNewMessage && message.user_idSend !== '0' && message.user_idSend !== user._id ? (
          <NewMessage message={message} nav={'/user/messages'} />
        ) : message.user_idSend !== user._id ? (
          <button className="btn button me-2" onClick={handleReplyMessage}>
            + REPLY MESSAGE
          </button>
        ) : null}

        <ToastContainer />
      </div>
    </div>
  );
}
