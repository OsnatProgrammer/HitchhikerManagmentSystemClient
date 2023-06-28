import { async } from 'q'
import React, {useRef} from 'react'
import { API_URL, doApiMethod } from '../services/apiService';

export default function NewMessage(props) {
const messageText=useRef();
    const sendMessage = async () => {
        const url = `${API_URL}/messages/addMessage`;

        try {

            let resp = await doApiMethod(url, "POST", { user_idSend:props.message.user_idReceive,user_idReceive: props.message.user_idSend, messageDetails:messageText.current.value , rides_id: props.message.rides_id })
            return resp;
            

        }
        catch (err) {
            console.log(err.response);
            alert("There is problem");

        }
    }

    return (
        <div>
            <h5>Write your message here:</h5>
            <textarea ref={messageText}  rows={4} cols={50} /><br />
            <button className='btn btn-dark' onClick={sendMessage}>SEND</button>
        </div>
    );
}

