import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const initialVisitorCount=Number(localStorage.getItem('visitorCount')) || 1;
  const [visitorCount,setVisitorCount]=useState(initialVisitorCount);

  //we can u simply this 
  //const [visitorCount,setVisitorCount]=useState(localStorage.visitorCount!=undefined? Number(localStorage.visitorCount):1);


  const displayStatus=()=>{
    console.log('Visitor count incremented.You are visitor #'+visitorCount);
  }

  //useeffect is called when rendering happen/
  //when this useefffect is executed---load the page/update the state of component/unload the page/navigate the page
  //combination of all three lifecyscle in class component as one in functional component using---useeffect
  //life cycle functions is performed usng the use effect
  //refresh--mounting useeffect executed
  //update-- entering to component update using the button when u click it updates


  //will run whenever component is mounted
  useEffect(()=>{
    console.log('Visitor count updated');//only when u refresh the page it gets printed 
   // setVisitorCount(visitorCount+1);
  },[visitorCount]); //provide dependency that is empty array[] so only when refresh happen it gets incremented
  localStorage.setItem('visitorCount',visitorCount);
  //if we give it [] blank only mounting will happen; [visitorCount]--now update phase is done using this
  //its also called observer pattern;observe the changes ;if anychanges happens then also this func should exexcted

  //u can aslo use simply like this 
  //hook is a class
  // useEffect(()=>{
  //   displayStatus,[visitorCount]
  // });

  //displayStatus is a callback function because it itself/automatically called withod manually calling

  const updateVisitorCount=()=>{
    setVisitorCount(visitorCount+1);
    console.log('Visitor count incremented.You are visitor #'+visitorCount);
  }
  //UseEffect is used to provide --lifecycle phases for the functional components
  return (
    <div className="App">
      <form>
        <input type="button" onClick={updateVisitorCount} value="Update Visitor" /><br />
        <b>You are visitor # </b>{visitorCount}
      </form>
    </div>
  );
}

export default App;
