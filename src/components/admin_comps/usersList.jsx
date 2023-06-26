import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER, doApiMethod } from '../services/apiService';


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

  const [users, setUsers] = useState([]);
  const [isOn, setIsOn] = useState(false);


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
  }, []);


  const doApiStatus = async (_user) => {
    console.log(_user);
    let url = API_URL + "/users/updateStatus/" + _user._id;
    try {
      _user.status = !_user.status
      await doApiMethod(url, "PATCH", _user);
      window.location.reload();
    }
    catch (err) {
      console.log(err.response);
    }
  }



  return (
    <div className="container">
      <h1>Users</h1>
      {users.length > 0 ? (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>FullName</th>
              <th>Email</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Date_created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName.firstName + " " + user.fullName.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{new Date(user.date_created).toLocaleDateString()}</td>
                <td>
                  <button
                    className={`btn ${user.status ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => { doApiStatus(user) }}
                  >
                    {user.status ? 'On' : 'Off'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}
