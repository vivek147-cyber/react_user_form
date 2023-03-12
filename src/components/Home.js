import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://viveksingh123.pythonanywhere.com/user-form/';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add-form">Add Post</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Gender: {user.gender}</div>
            <div>Date of Birth: {user.dob}</div>
            <div>Phone Number: {user.phone_number}</div>
          </li>
          
        ))}
      </ul>
     
    </div>
  );
}
export default Home;
