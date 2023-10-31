import { useState } from "react";

//example for using --using props to set data in usestate for functional component
//difference between props and state
//states--dynamically changing by calling appropriate setter function

//values of props can't be modified 
//props.companyName="GAVS Ltd";
//Cannot assign to read only property 'companyName' of object '#<Object>'
//in ur project if some things have to remain constant then use ---props
function AboutUs(props){
    const[companyName,setcompanyName]=useState(props.companyName);
    const[address,setaddress]=useState(props.address);

    return(<center><div>
        <b>Contact us @</b> {companyName} <br />
        <b>Our Address @</b> {address} <br />

        </div></center>)

}

export default AboutUs;