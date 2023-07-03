import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, doApiMethod } from '../services/apiService';
import styles from './css/cardsUser.module.css'


export const getUsersList = async () => {
  try {
    const url = API_URL + `/users/usersList`;
    const response = await doApiGet(url);
    console.log("response", response);
    const users = response.data;
    console.log(users);
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users");
  }
};


export default function UsersList() {

  const imageFemale = "https://media.istockphoto.com/id/1098017436/photo/portrait-of-a-young-woman-side-view.jpg?s=612x612&w=0&k=20&c=Tr3GW0WT5ytzuj6JcLV98R4MDTtB6i2K3Z8gvqPTCpA=";
  const imageMale = "https://media.istockphoto.com/id/498085583/photo/silhouette-of-the-man-on-a-white-background.jpg?b=1&s=612x612&w=0&k=20&c=qtvfp762Uyes36ThewDwdRnTuj1xf45rHJEDsk4ius0=";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsersList();
        setUsers(usersData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, [users]);


  const doApiStatus = async (_user) => {
    console.log(_user);
    let url = API_URL + "/users/updateStatus/" + _user._id;
    try {
      _user.status = !_user.status
      await doApiMethod(url, "PATCH", _user);
    }
    catch (err) {
      console.log(err.response);
    }
  }



  return (
    <div className="container">
      {users.length > 0 ? (
        <div className='row'>
          {/* <h1>Users</h1> */}
          {users.map((user) => (
            <div className="col-lg-3 mt-4">
              <div className={`text-center ${styles.card_box}`}>
                <div className="member-card pt-2 pb-2">
                  <div className={`${styles.thumb_lg} ${styles.member_thumb} mx-auto`}>
                  <img src={user.gender == "male" ? `${imageMale}` : `${imageFemale}`} className={`rounded-circle ${styles.img_thumbnail}`} alt="profile-image" />
                  {/* <img src="" alt="profile-image" /> */}
                  </div>
                  <div className="">
                    <h4>{user.fullName.firstName + " " + user.fullName.lastName}</h4>
                    <p className={`${styles.text_muted}`}>{user.role}<span>| </span><span className={`${styles.text_pink}`}>{user.gender}</span></p>
                  </div>
                  <ul className={`${styles.social_links} list-inline`}>
                    <li className="list-inline-item">
                      <a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Facebook"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li className="list-inline-item">
                      <a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li className="list-inline-item">
                      <a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Skype"><i className="fa fa-skype"></i></a>
                    </li>
                  </ul>
                  <button
                    className={`btn btn-primary mt-3 ${styles.btn_rounded} ${user.status ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => { doApiStatus(user) }}
                  >
                    {user.status ? 'Active' : 'Inactive'}
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="mt-2">
                        <h4>Adrress:</h4>
                        <p className={`mb-0 ${styles.text_muted}`}>{user.address}</p>
                      </div>
                      <div className="mt-2">
                        <h4 className=''>Email:</h4>
                        <p className={`mb-0 ${styles.text_muted}`}>{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>) : (
        <p>No users available</p>
      )}
    </div>
  );
}
