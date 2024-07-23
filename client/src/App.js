import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiCallToUser();
  }, []); // Empty dependency array ensures this runs only once

  const apiCallToUser = () => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log('Response data:', response.data); // Log response data for debugging
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
          setUsers([]); // Ensure users is an array
        }
      })
      .catch(e => {
        console.log('Error', e);
        setUsers([]); // Ensure users is an array in case of error
      });
  };

  console.log('Users state:', users); // Log the users state for debugging

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>USERS</h1>
          {Array.isArray(users) ? (
            users.map((user, index) => (
              <p key={index}>hey {user.name}, from {user.email}</p>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
