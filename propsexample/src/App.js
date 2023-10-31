import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App(props) {
  // console.log(process.argv[0]);//argv is array that parameters we giving
  // console.log(process.argv[1]);
  // console.log(process.argv[2]);
  // console.log("you have passed a total of"+process.argv.length+"parameters...");

  var username=prompt("Enter your name");
  if(props.name !==username){
  var today=new Date();
  if(today.getHours()>=props.visitingtime)
  {
  return (
    <div className="App">
      <b>Welcome Mr/Ms</b>{props.firstname} &nbsp;&nbsp;
      {props.lastname}
      <input type="text" minLength="10" maxLength="20"/> 
      {/* type is attribute;text is value; these properties are called as props in reactjs 
      Main use of props is we can mention some defaults in your applicatio n like visitingtime is 100am
      */}
    </div>
  );
  }else{
    return(<div><b>Visit after {props.visitingtime} in your local time</b></div>)
  }
}else return (<div className='App'><b>Hi{props.name}Your account is blocked 
Please contact the administartor</b></div>)
}

export default App;
