import {Component} from "react";
import User from './User'

class UserDetails extends Component{
    //for collecting many users data in the form
    userArray=[];
    cnt=0;
    constructor(){
        super();
        this.state={firstname:'Unknown',address:'Unknown',updateCount:0,userArray:[]};
        this.updateFirstname=this.updateFirstname.bind(this);
        this.updateAddress=this.updateAddress.bind(this);
        this.ConfirmReset=this.ConfirmReset.bind(this);
        this.AddUser=this.AddUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
    }
    //This function gets executed when the tag is getting loaded in mounting phase
    //used to initialize the state and perform some initial task like db connection,authentication
    //loading
    // componentDidMount(){
    //     this.setState({firstname:'Sangeetha'});
    //     this.setState({address:'Chennai'});
    //     console.log("state initialized...");
    // }
    //when the tag is getting updated the function willupdate gets executed--updating

    // componentDidUpdate(){
    //     var today=new Date();
    //     //this.setState({updateCount:this.state.updateCount+1}); it wll become recursively
    //     //userdetails is the tag --it has state--if u change any value of state--tag is changing --it will call componentDidUpdate
    //     //here in componentDidUpdate again incrementeing--again causing the tag to change
    //     console.log('Got updated on'+today.getHours()+":"+today.getMinutes()+"for"+this.state.updateCount+"times");
    // }
    //when u close the browser page--unloading
    //it will unload in reverse order from back

    // componentWillUnmount(){
    //     var today=new Date();
    //     console.log("Tag unmounted on"+today.getHours()+":"+today.getMinutes());
    // }
    updateFirstname(event){
        this.setState({firstname:event.target.value});
        this.setState({updateCount:this.state.updateCount+1});
    }
    updateAddress(event){
        this.setState({address:event.target.value});
        this.setState({updateCount:this.state.updateCount+1});
    }
    ConfirmReset(){
        var value=window.confirm("Do you wish to reset the form ? Yes/No");
        return value;
    }
    AddUser(event){
        //object user
        event.preventDefault();//it will prevent you from refresh or going to next page
        var u=new User(this.state.firstname,this.state.address);//constructor;u is object
        this.userArray.push(u);
        this.setState({firstname:"",address:""});
        // this.setState({
        //     userArray: [...this.state.userArray, u],
        //     firstname: '',
        //     address: '',
        //     updateCount: this.state.updateCount + 1,
        //   });
        console.log(this.userArray[0]);
    }
    deleteUser(index) {
        const updatedUserArray = [...this.userArray];//spread operator 
        updatedUserArray.splice(index, 1);
        this.userArray = updatedUserArray;
    
        //this.setState({ userArray: updatedUserArray });
        this.forceUpdate();
    }
    
    render(){
        return(
            <div>
                <center>
                <form onReset={this.ConfirmReset} onSubmit={this.AddUser}>
                    {/* Model-to-View binding is done here */}
                    <label>First name</label><input type="text" value={this.state.firstname} onChange={this.updateFirstname}/><br />
                    <label>Address</label><input type="text" value={this.state.address} onChange={this.updateAddress}/><br /><br />
                    <input type="submit" value="Add Data"/>&nbsp;&nbsp;
                    <input type="reset" value="Reset" />
                </form>
                </center><br />
                
                {/* <ul>
                {  //usr is an object to access attributes inside usr object use usr.firstname
                    this.userArray.map((usr,index) => (
                    <li key={index}>
                        {usr.firstname}&nbsp;
                        {usr.address}
                    </li>
                    ))
                }
                </ul> */}
                <table border="1" align="center">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Address</th>
                        <th>Delete</th>
                     </tr>
                     </thead>
          <tbody>
            {this.userArray.map((usr, index) => (
              <tr key={index}>
                <td>{usr.firstname}</td>
                <td>{usr.address}</td>
                <td>
                  <button onClick={() => this.deleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default UserDetails;