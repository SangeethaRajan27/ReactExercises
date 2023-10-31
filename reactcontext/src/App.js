import logo from './logo.svg';
import './App.css';
import UserInfo from './UserInfo'
import {createContext} from 'react';
//common memory area that is accessed by multiple pages
//by usecontext we can share data over pages
//we can also use props but cannot be modified

export const sharedData=createContext();

function App() {
  const [firstname,setfirstname]=useState('unknown');
  const [lastname,setlastname]=useState('unknown');
  const [agree,setagree]=useState(false);

  const updatefirstname=(e)=>{
    setfirstname(e.target.value);
  }
  const updatelastname=(e)=>{
    setlastname(e.target.value);
  }
  const updateagree=(e)=>{
    setagree(e.target.checked);
  }
  return (
    <div className="App">
        First name <input type="text" value={firstname} onChange={updatefirstname} /><br />
        Last name <input type="text" value={lastname} onChange={updatelastname} /><br />
        <input type="checkbox" onChange={updateagree}/>Agree to Terms & Conditions

      {/* we cant pass two parameters her so use concat + 
      =>Mention what data has to be shared
      =>Also mention the page or the component with which the data has to be shared
      */}

        <sharedData.Provider value={firstname + " " + lastname}>
        {agree ? <UserInfo/>:""} 
        {/* if agree is true display userinfo else blank */}
      </sharedData.Provider>
    </div>
  );
}

export default App;
