import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
//In functional tags use arrow function syntax
//useState is used to define state
//define fields in the state
//key--fieldname;value--setfirstname for const [firstName,setFirstName]

//State--only one setstate method is there with which we do operation for every field -- IN class component
//UseSate--for every field we have to define set method-- IN functional component
function App() {
  const [firstName,setFirstName]=useState('Unknown');
  const [lastName,setLastName]=useState('Unknown');
  const [agree,setAgree]=useState(false);
  const [error,setError]=useState('');

  //we should compulsorly use const keyword 
  const updateFirstName=(event)=>{
    setFirstName(event.target.value);
    enableCheckbox(event.target.value,lastName);
    if(!isValid()){
      setAgree(false);
    }
  }
  const updateLastName=(event)=>{
    setLastName(event.target.value);
    enableCheckbox(firstName,event.target.value);
    if(!isValid){
      setAgree(false);
    }
  }
  const enabledisable=(event)=>{
    //checked is property of checkbox.It contains true/false
    setAgree(event.target.checked);
  }
  const enableCheckbox = (firstName, lastName) => {
    if (firstName.length <= 5 || lastName.length <= 5) {
      setError('First name and Last name should be more than 5 characters')
    } else {
      setError('')
    }
  };
  const isValid = () =>{
     return firstName.length > 5 && lastName.length > 5;
  };

  return (
    <div>
      <form>
        {/* binding is done here with{} bracket like this value={firstName} */}
        Enter your name <input type="text" value={firstName} onChange={updateFirstName}/><br />
        Enter your name <input type="text" value={lastName} onChange={updateLastName}/><br />
        {/* if true the button must be shown else disabled button
        condition rendering --if condition is satisfied then do operation like this
        condition rendering --uses ternary operator
         */}
         { <div style={{color:"red"}}>{error}</div>}
         <b>Your name</b>{firstName} &nbsp;&nbsp; {lastName}<br />
         <input type="checkbox" value={agree} onChange={enabledisable} disabled={!isValid()}/>Agree to Terms & Conditions
         <input type="button" value="Save" disabled={!agree || !isValid()} />

         {/* { 
         //Conditional rendering. A new feature in reactjs
          agree? <input type="button" value="Save" />:
          <input type="button" value="Save" disabled/>
         } */}
        
      </form>
    </div>
  );
}

export default App;
