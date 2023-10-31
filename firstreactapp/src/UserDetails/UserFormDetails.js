import { Component } from "react";
class UserFormDetails extends Component{
    //This class must implement a function called render
    //intializing object
    //it is called when object is create
    //return no value
    constructor(){
        super();
        this.state={  //this refers to current object
            firstName:'Sangee',//key and value
            lastName:'rajan'
        };
        this.updateFirstName=this.updateFirstName.bind(this);//we should bind the function to get worked
        this.updateLastName=this.updateLastName.bind(this);
    }
    updateFirstName(event){ 
        //we dont want to use function keyword
        //usage of this is neccessary this.updateFirstName()
        //here event is the value of the text field which is typed by user
        console.log(event.target.value);//value means its text or radio button like thats
        //store the value of the firstname textbox into firstname field in state
        this.setState({firstName:event.target.value});
    }
    updateLastName(event){
        console.log(event.target.value);
        this.setState({lastName:event.target.value});
    }
    //another example intead of using binding the function
    updateFirstName2 = (event) => {
        this.setState({ firstName: event.target.value });
      }
    
    updateLastName2 = (event) => {
        this.setState({ lastName: event.target.value });
      }
    render(){
        return(
            <div className="formclass">
                <center>
                <form>
                    <label>First name</label><input type="text" name="firstname" placeholder={this.state.firstName} onChange={this.updateFirstName}/><br />
                    <label>Last name</label><input type="text" name="lastname" placeholder={this.state.lastName} onChange={this.updateLastName} /><br />
                    {/* before 2lines = model-view directly (one-way binding) ;view-model is not direct througgh controller(two-way) */}
                    {/* value={this.}={} is called interpolation */}
                    <input type="submit" value="Save" /><br />
                    <b>Your full name. Mr/Mrs</b>&nbsp;&nbsp;
                    <label>{this.state.firstName}&nbsp;&nbsp;{this.state.lastName}</label>
                </form>
                </center>
            </div>
        );
    }
}
export default UserFormDetails;
//model--data place wher data is stored
//view--html page
//state--is the model
//html form--is the view 
//from view we are capturing data that store in state
//functions like updatefirstname--is the controller

//first step-- we are linking the "view-controller binding"
//second step--geting value of textbox and updating the value in state fields "controller-model binding"
//model is binded to the view ie.{this.state.firstname} "model-view binding" which is one way binding

//Binding is of two ways:
//one way binding--model to view
//two way binding--other two
//mvvm architecture
//no need of controller --directly bind view to the model


/*one way binding--
1)model to view 
2)view to model 
3)view to controller */

/*two way binding--
1)model to view 
2)view to model 
cthrough controller only */




