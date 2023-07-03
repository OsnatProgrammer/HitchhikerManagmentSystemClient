import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { CURRENT_USER, doApiMethod, doApiGet, doApiMethodTokenPatch } from '../services/apiService';
import { API_URL } from '../services/apiService';
import styles from '../admin_comps/css/cardsUser.module.css'



export default function UploadTest() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    console.log(currentUser);
    const fileRef = useRef();
    const [theUser, setTheUser] = useState(currentUser);
    console.log(theUser);

    useEffect(() => {
        // Fetch the user data, including the imageUrl, from the server when the component mounts
        const fetchUserData = async () => {
            try {
                localStorage.setItem(CURRENT_USER, JSON.stringify(theUser));

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [theUser]);



    const onSub = (e) => {
        e.preventDefault();

        doApiFileUpload();

        console.log("upload file form");

    }

    const doApiFileUpload = async () => {
        console.log(fileRef.current.files[0])
        if (fileRef.current.files.length == 0) {
            return alert("you need to choose file and then upload it")
        }
        let myFile = fileRef.current.files[0];
        if (myFile.size > 2 * 1024 * 1024) {
            return alert("file too big")
        }
        console.log(myFile);
        // new FormData() -> יודע להתעסק בטופס עם מידע כמו קבצים מהצד לקוח
        const formData = new FormData();
        formData.append("myFile22", myFile);
        let url = API_URL + "/upload";
        try {
            console.log(formData);
            let resp = await axios.post(url, formData)
            console.log(resp);
            if (resp.status) {
                alert("file uploaded");
                currentUser.imageUrl = resp.data.name;
                setTheUser(currentUser);
                console.log(theUser);
                doApiEditInfo(theUser);
            }
        }
        catch (err) {
            alert("there error, try again later")
            console.log(err);
        }
    }

    const doApiEditInfo = async (user) => {
        if (user) {
            let url = API_URL + '/users/updateImage/' + user._id;
            try {
                const data = await doApiMethod(url, "PATCH", user);
                if (data) {
                    window.location.reload(false);
                } else {
                    console.log(data)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className="col-lg-3 mt-5 ">
                    <div className={`text-center ${styles.card_box}`}>
                        <div className={`${styles.thumb_lg} ${styles.member_thumb} mx-auto`}>
                            <img src="" className={`rounded-circle ${styles.img_thumbnail}`} alt="profile-image" />
                        </div>
                        <div className="mx-auto text-center">
                            <h4>upload image</h4>
                            <div className="mt-2">
                                <input ref={fileRef} type="file" />
                                <br />
                            </div>
                            {/* <p className={`${styles.text_muted}`}>{user.role}<span>| </span><span className={`${styles.text_pink}`}></span></p> */}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={onSub}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
