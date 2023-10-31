var myssql=require('mysql');//loading the driver
var exp=require('express');

//cross origin resource sharing
var cors=require('cors'); //enabling communication between two server.
var bpasrser=require('body-parser');
bodyParserInit=bpasrser.urlencoded({extended:false});
var app=exp();
app.use(cors());
app.use(exp.json());
app.use(bpasrser.json());     // for parsing application/json
app.use(bodyParserInit);      // for parsing application/x-www-form-urlencoded

myssqlconnection=myssql.createConnection({
    host:'localhost',
    port:3306,
    database:'world',
    user:'root',
    password:'root'
});
function testconnection(error){
    if(error==undefined){
        console.log("Connected to the database...");
    }
    else{
        console.log("Error code:"+error.errorno);
        console.log(error.message);
    }
}
 
myssqlconnection.connect(testconnection);

function feedback(error){
    if (error==undefined){
    console.log("Server started on port 4000");
    console.log("Open the browser and visit http://localhost:4000/getall");
    }
    else{
        console.log(error.errorno);
        console.log(error.message);
    }
}
 
app.listen(4000,feedback);

function displayAllContacts(request, response){
    myssqlconnection.query('select * from contacts', (error, results) => {
        if(error) {
            console.error("Error fetching contacts:", error);
            response.status(500).send("Error fetching contacts.");
        } else {
            response.send(results);
        }
    });
}
 
function getcontactbyId(request, response){
    var contactid = request.query.cid;
    myssqlconnection.query('select * from contacts where id=?', [contactid], (error, results) => {
        if(error) {
            console.error("Error fetching contact by ID:", error);
            response.status(500).send("Error fetching contact by ID.");
        } else {
            response.send(results);
        }
    });
}
 
// function addContact(request, response) {
//     const contact = request.body; // this contains the data sent from the client
 
//     const { id,firstname, lastname, emailId, address, phonenumber } = contact;
 
//     const query = 'INSERT INTO contacts (firstname, lastname, emailId, address, phonenumber) VALUES (?,?, ?, ?, ?, ?)';
 
//     myssqlconnection.query(query, [id,firstname, lastname, emailId, address, phonenumber], (error, results) => {
//         if(error) {
//             console.error("Error inserting contact:", error);
//             response.status(500).send("Error adding contact.");
//         } else {
//             response.status(201).send({ message: "Contact added successfully!", id: results.insertId });
//         }
//     });
// };

function addContact1(request, response) {
    const contact = request.body;
    const { id, firstname, lastname, emailId, address, phonenumber } = contact;

    if (id === null || id === undefined) {
        // Handle the case where 'id' is null or undefined (e.g., generate a new unique id)
        // You can use a library like 'uuid' to generate a unique id.
        // Example:
        // const id = uuid.v4();
        response.status(400).send("ID cannot be null or undefined.");
    } else {
        const query = 'INSERT INTO contacts (id, firstname, lastname, emailId, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?)';
        myssqlconnection.query(query, [id, firstname, lastname, emailId, address, phonenumber], (error, results) => {
            if (error) {
                console.error("Error inserting contact:", error);
                response.status(500).send("Error adding contact.");
            } else {
                response.status(201).send({ message: "Contact added successfully!", id: results.insertId });
            }
        });
    }
}
function addContact(request, response) {
    const contact = request.body; // this contains the data sent from the client
 
    const { firstname, lastname, emailId, address, phonenumber } = contact;
 
    const query = 'INSERT INTO contacts (firstname, lastname, emailId, address, phonenumber) VALUES (?, ?, ?, ?, ?)';
 
    myssqlconnection.query(query, [firstname, lastname, emailId, address, phonenumber], (error, results) => {
        if(error) {
            console.error("Error inserting contact:", error);
            response.status(500).send("Error adding contact.");
        } else {
            response.status(201).send({ message: "Contact added successfully!", id: results.insertId });
        }
    });
};

// function createUser(request,response){
//     // var id=request.body.id;
//     var firstname=request.body.fname;
//     var lastname=request.body.lname;
//     var emailId=request.body.email;
//     var address=request.body.address;
//     var phonenumber=request.body.phno;
//     console.log(firstname+"\t\t"+emailId);
//     myssqlconnection.connect(testconnection);
//     myssqlconnection.query('insert into contacts (firstname, lastname, emailId, address, phonenumber) values (?,?,?,?,?)', [firstname, lastname, emailId, address, phonenumber], (error, results) => {

//     //myssqlconnection.query('insert into contacts values(?,?,?,?,?)',[firstname,lastname,emailId,address,phonenumber],(error, results) => {
//         if (error) {
//             console.error("Error inserting contact:", error);
//             response.status(500).send("Error adding contact.");
//         } else {
//             response.status(201).send({ message: "Contact added successfully!", id: results.insertId });
//         }
//     });
// }
 
function deleteContact(request, response) {
    const contactId = request.params.id; // extract ID from the URL
 
    const query = 'DELETE FROM contacts WHERE id = ?';
 
    myssqlconnection.query(query, [contactId], (error, results) => {
        if (error) {
            console.error("Error deleting contact:", error);
            response.status(500).send("Error deleting contact.");
        } else {
            if (results.affectedRows === 0) {
                // No contact was deleted (probably the ID does not exist)
                response.status(404).send({ message: "Contact not found." });
            } else {
                response.status(200).send({ message: "Contact deleted successfully!" });
            }
        }
    });
}
 
function updateContact(request, response) {
    const contactId = request.params.id; // extract ID from the URL
    const { firstname, lastname, emailId, address, phonenumber } = request.body; // extract updated details from the request body
 
    const query = 'UPDATE contacts SET firstname = ?, lastname = ?, emailId = ?, address = ?, phonenumber = ? WHERE id = ?';
 
    myssqlconnection.query(query, [firstname, lastname, emailId, address, phonenumber, contactId], (error, results) => {
        if (error) {
            console.error("Error updating contact:", error);
            response.status(500).send("Error updating contact.");
        } else {
            if (results.affectedRows === 0) {
                // No contact was updated (probably the ID does not exist)
                response.status(404).send({ message: "Contact not found." });
            } else {
                response.status(200).send({ message: "Contact updated successfully!" });
            }
        }
    });
}
 
app.get('/getall',displayAllContacts);
app.get('/getbyId',getcontactbyId);
app.post('/addContact',addContact);
// app.post('/adduser',createUser);
app.delete('/deleteContact/:id', deleteContact);
app.put('/updateContact/:id', updateContact);
 