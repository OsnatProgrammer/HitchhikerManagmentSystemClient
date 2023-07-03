import React from 'react'
import styles from './css/homeManager.module.css'
import { Link } from 'react-router-dom'
import { CURRENT_USER } from '../services/apiService';

function HomeManager() {
    let current_user = JSON.parse(localStorage.getItem(CURRENT_USER));

    return (
        <>
            <div className={`${styles.strip} d-flex align-items-end`}>
                <div className='display-1'>
                    Hello Manager {current_user.fullName.firstName}!
                </div>
            </div>

            <div className='container text-white pb-5'>
                {/* <div className='display-3'>Hello manager!</div> */}
                <div className='row justify-contect-center text-center my-5' style={{ fontSize: '20px', minHeight:'200px'}}>
                    <div className='col-md-3'>
                        <div>
                            <Link to={"/manager/myInfo"}>
                                <i className={`bx bxs-user-detail ${styles.link}`}></i>
                            </Link>
                        </div>
                        <div>Edit Profile</div>
                    </div>
                    <div className='col-md-3'>
                        <div>
                            <Link to={"/manager/usersList"}>
                                <i className={`bx bxs-user ${styles.link}`}></i>
                            </Link>
                        </div>
                        <div>Users List</div>
                    </div>
                    {/*  */}
                    <div className='col-md-3'>
                        <div>
                            <Link to={"/manager/ridesList"}>
                                <i className={`bx bxs-car ${styles.link}`}></i>
                            </Link>
                        </div>
                        <div>Rides List</div>
                    </div>
                    {/*  */}
                    <div className='col-md-3'>
                        <div>
                            <Link to={"/manager/messages"}>
                                <i className={`bx bxs-message ${styles.link}`}></i>
                            </Link>
                        </div>
                        <div>Messages</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeManager