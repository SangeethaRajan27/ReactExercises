var expr=require('express');//step1=>import expressjs
var bodyParser = require('body-parser');
bodyParser=bodyParser.urlencoded({extended:false});
//nodejs code we have used expressjs libraray here

//step2=>initialize and configure expressjs
var app=expr();

var users=[
    {userID:"100",firstname:"Sangeetha",lastname:"Rajan"},
    {userID:"101",firstname:"Suganth",lastname:"Sai"},
    {userID:"102",firstname:"Stepehen",lastname:"Sai"},//key value pair
];

var visitorCount=0;

//request--represents http request
//response--represents http response
function welcome(request,response){
    var today=new Date();
    visitorCount++;
    var resp="<html><body><b>Today:" + today;
    resp+="</b><br><b>Visitor Count </b>:" + visitorCount;
    resp+="</body></html>";
    response.end(resp);
}
function home(request,response){
    var resp="<html><body><b>Welcome to our site...<br>";
    resp+="<a href=/welcome>Welcome page</a></body></html>"
    response.send(resp);
}
function retrieveuser(request,response){
    var status=false;
    var userid=request.query.uid;
    var firstname=request.query.fname;
    console.log(userid);
    for(var user of users)
    {
        if(userid==user.userID && firstname==user.firstname){
            console.log(user.userID);
            status=true;
            break;//only if we give break it will work ; 
            //because it iterates through all and prints only the last data given in the array
        }
    }
    if(status)
         response.send(user);
    else
        response.send("<b>No user with given ID</b>" + userid);
}

function retrievealluser(request,response){
    response.send(users);
}
function getbyid(request,response){
    var userid=request.query.uid;
    for(var user of users){
        if(userid==user.userID){
            console.log(user.userID);
            response.send(user);
            break;
        }
        else
        response.send("<b>No user with given ID</b>" + userid);
    }
}
function deleteuser(request,response){
    var userid=request.query.id;
    var idextoremove=-1;
    for(var u=0;u<users.length;u++){
        if(userid==users[u].userID){
            idextoremove=u;
            break;
        }
    }
    if(idextoremove!==-1){
        users.splice(idextoremove,1);
        response.send("Removed User with userid"+userid);
    }
    else{
        response.send("Userid is not found");
    }
}
function addnewuser(request,response){
    var userid=request.body.uid;
    var first_name=request.body.fname;
    var last_name=request.body.lname;
    var rval=users.push({userID:userid,firstname:first_name,lastname:last_name});//users.push()returns the length of array
    response.send("User Added succesfully.Total users:"+rval);
}

function updateuser(request, response) {
    var userid = request.body.uid;
    var updatedUser = {
        userID: userid,
        firstname: request.body.fname,
        lastname: request.body.lname,
    };
    var userIndex = -1;
    for (var i = 0; i < users.length; i++) {
        if (userid == users[i].userID) {
            userIndex = i;
            break;
        }
    }
    if (userIndex !== -1) {
        // Update the user at the specified index
        users[userIndex] = updatedUser;
        response.send("User updated successfully.");
    } else {
        response.send("User not found for update.");
    }
}

app.get('/welcome',welcome)//welcome is callback
app.get('/',home)
app.get("/getuser",retrieveuser);
app.get("/getalluser",retrievealluser);
app.get("/getbyid",getbyid);
app.delete("/deleteuser",deleteuser);
app.post("/adduser",bodyParser,addnewuser);
app.put("/updateuser",bodyParser,updateuser);
//getall,getbyid,deletebyid

function feedback(){
    console.log("Server started on port 4000");
    console.log("Open the browser and visit http://localhost:4000/welcome ");
}
app.listen(4000, feedback) //connect to server
//server should continuosly in a blocking state we used listen ;
//only when you send request this function is called and display things

/*
http://localhost:4000/getuser?uid=101&fname=Suganth 
*/