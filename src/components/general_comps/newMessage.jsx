import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef } from 'react'
import { API_URL, doApiMethod } from '../services/apiService';
import { useNavigate } from 'react-router-dom';


export default function NewMessage(props) {

    const messageText = useRef();
    const navigate = useNavigate();

    const sendMessage = async () => {
        const url = `${API_URL}/messages/addMessage`;

        try {
            // Send the message and await the response
            let resp = await doApiMethod(url, 'POST', {
                user_idSend: props.message.user_idReceive,
                user_idReceive: props.message.user_idSend,
                messageDetails: messageText.current.value,
                rides_id: props.message.rides_id,
            });

            // Show success notification
            toast.success('Message sent successfully!', {
                // position: toast.POSITION.TOP_RIGHT,
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000, // Automatically close after 2 seconds
            });

            // Navigate to the Messages component
            setTimeout(() => {
                // Navigate to the Messages component after 2 seconds
                navigate('/user/messages');
            }, 2000);

        } catch (err) {
            console.log(err.response);
            alert('There is a problem');
        }
    };


    return (
        <div>
            <ToastContainer />

            <h5>Write your message here:</h5>
            <textarea ref={messageText} rows={4} cols={50} /><br />
            <button className='btn btn-dark' onClick={sendMessage}>SEND</button>
        </div>
    );
}

