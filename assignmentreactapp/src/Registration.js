import React, { useState } from 'react';
import User from './User';

function UserDetails() {
  const [firstname, setFirstname] = useState('Unknown');
  const [address, setAddress] = useState('Unknown');
  //const [updateCount, setUpdateCount] = useState(0);
  const [userArray, setUserArray] = useState([]);

  const updateFirstname = (event) => {
    setFirstname(event.target.value);
    //setUpdateCount(updateCount + 1);
  };

  const updateAddress = (event) => {
    setAddress(event.target.value);
    //setUpdateCount(updateCount + 1);
  };

  const confirmReset = () => {
    const value = window.confirm('Do you wish to reset the form? Yes/No');
    return value;
  };
  const resetForm = () => {
    setFirstname(''); // Reset firstname to an empty string
    setAddress('');   // Reset address to an empty string
  };

  const addUser = (event) => {
    event.preventDefault();
    const u = new User(firstname, address);
    //setUserArray([...userArray, u]);

    const updatedUserArray = [...userArray, u]
    sessionStorage.setItem('userArray', JSON.stringify(updatedUserArray));
    setUserArray(updatedUserArray);
    setFirstname('');
    setAddress('');
  };

  const deleteUser = (index) => {
    const updatedUserArray = [...userArray];
    updatedUserArray.splice(index, 1);
    setUserArray(updatedUserArray);
    sessionStorage.setItem('userArray', JSON.stringify(updatedUserArray));
  };

  return (
    <div>
      <center>
        <form onSubmit={addUser}>
          <label>First name</label>
          <input type="text" value={firstname} onChange={updateFirstname} /><br />
          <label>Address</label>
          <input type="text" value={address} onChange={updateAddress} /><br /><br />
          <input type="submit" value="Add Data" />&nbsp;&nbsp;
          <input type="reset" value="Reset" onClick={resetForm} />
        </form>
      </center><br />

      <table border="1" align="center">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userArray.map((usr, index) => (
            <tr key={index}>
              <td>{usr.firstname}</td>
              <td>{usr.address}</td>
              <td>
                <button onClick={() => deleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
