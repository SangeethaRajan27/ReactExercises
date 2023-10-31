var exp=require("express");
var dot=require("dotenv");
var mongo=require("mongoose");
var bpasrser=require('body-parser');
bodyParserInit=bpasrser.urlencoded({extended:false});
var app=exp();
mongo.createConnection();
mongo.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo").then
(()=>(console.log("Connected to the database..."))).catch(
    ()=>(console.log("Unable to connect. Check the url "))
)

const userschema={userid:String,password:String,emailId:String}

var userData=mongo.model('users',userschema);//it will not consider uppercase collection names
// var udata=new userData({'userid':'user009','password':'pass','emailId':'ss@gmail.com'})
// udata.save().then((data)=>console.log("Insert successfull..")).catch((error)=>
// {
//     console.log(error);
// })

//userData.find().then((data)=>console.log(data)).catch((error)=>console.log(error))

//.then =>when connection is established successfully

// var db=mongo.connection.useDb('local');
// //display the name of selected database

// console.log(db.name);

// console.log("Total no of collections :"+db.collection.length);

function createUser(request,response){
    var udata=new userData({'userid':request.body.uid,'password':request.body.password,'emailId':request.body.email})
udata.save()
.then((data)=>{
    console.log("Insert successfull..");
    response.send("Insert data succesfully");
})
.catch((error)=>{
    console.log(error);
    console.log("Unable to insert data");
});
}

function getAllusers(request,response){
    userData.find()
    .then((data)=>
    console.log(data))
    .catch((error)=>{
    console.log(error);
    response.send("Could not retrieve the data");
})
}

function findOneUser(request, response) {
    const userId = request.params.userId; // Assuming you pass the userId in the URL
  
    userData.findOne({ _id: userId })
      .then((user) => {
        if (user) {
          // User found
          console.log(user);
          response.send(user);
        } else {
          // User not found
          console.log("User not found.");
          response.status(404).send("User not found.");
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send("Error while retrieving user.");
      });
  }

  function UpdateUser(request,response){
    var udata=userData.findOne({'_id':request.body.userid});
     udata.updateOne({$set:{'userid':request.body.uid,'password':request.body.password,'emailId':request.body.emailId}}).then((data)=>{
         response.send(data);
     }).catch((err)=>{
         console.log(err);
     })
 }
  
  // function updateUser(request, response) {
  //   const userId = request.params.userId; // Assuming you pass the userId in the URL
  //   const updateData = request.body; // Assuming you send the update data in the request body
  
  //   userData.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
  //     .then((user) => {
  //       if (user) {
  //         // User updated successfully
  //         console.log("User updated:", user);
  //         response.json(user); // Send the updated user as a JSON response
  //       } else {
  //         // User not found
  //         console.log("User not found.");
  //         response.status(404).send("User not found.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error while updating user:", error);
  //       response.status(500).send("Error while updating user.");
  //     });
  // }
  
  
  function deleteUser(request, response) {
    const userId = request.params.userId; // Assuming you pass the userId in the URL
  
    userData.findByIdAndRemove(userId)
      .then((user) => {
        if (user) {
          // User deleted successfully
          console.log("User deleted:", user);
          response.send("User deleted successfully.");
        } else {
          // User not found
          console.log("User not found.");
          response.status(404).send("User not found.");
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send("Error while deleting user.");
      });
  }
  
app.delete('/deleteuser/:userId', deleteUser);
  
// app.put('/updateuser/:userId', updateUser);

app.put('/UpdateUser',bodyParserInit,UpdateUser);
  
app.get('/getuser/:userId', findOneUser);
  
app.post('/insert',bodyParserInit,createUser);
app.get('/getall',getAllusers);


app.listen(8000,function(error){
    if(error!=undefined){
        console.log(error.message);
    }
    else
    console.log("Connect to port 8000. waiting for request");
    console.log("On the browser, visit http://localhost:8000/");
})