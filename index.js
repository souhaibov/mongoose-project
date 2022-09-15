const express = require('express');
const mongoose = require('mongoose');
const app = express();
const person = require('./person');
// the main file (index.js) knows the .env file with this line
require('dotenv').config()

//connection to database

const DBconnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
  
      console.log("Data base is connected");
    } catch (error) {
      console.log(error);
    }
  };

  DBconnect()

// security of the port
const port=process.env.PORT;

//Create and Save a Record of a person Model

const Person=new person({
    name: 'souhaib',
    age: 20,
    favoriteFoods: ['koskssi','kafteji'],
})
Person.save().then((el)=>console.log(el)).catch((err)=>console.log(err));

//Create Many Records with model.create()

person.create(
        [
            {
              name: "moldi ",
              age: 45,
              favoriteFoods: ["marga", "3ijja", "hargma"],
            },
            {
              name: "haythem ",
              age: 18,
              favoriteFoods: ["l7am", "djej", "7out"],
            },
            {
              name: "el Borni",
              age: 55,
              favoriteFoods: ["ma9arouna", "roz", "slata"],
            },
            {
              name: "fet7iz",
              age: 2,
              favoriteFoods: ["broudou", "7lib"],
            },
            {
              name: "jileni",
              age: 78,
              favoriteFoods: ["broudou"],
            },
          ] ,(err, data) => {
        err ? console.log(err) : console.log("added successfully")}
)

//Use model.find() to Search Your Database

person.find({},(err,data)=>{
    err? Console.log(err) : console.log(data)}
    )


//Use model.findOne() to Return a Single Matching Document from Your Database

person.findOne({favoriteFoods: ["ma9arouna", "roz", "slata"]},(err,data)=>
{err? Console.log(err) : console.log(data)})

//Use model.findById() to Search Your Database By _id

person.findById({_id: "632337fa7fb4c514b3aff9ab"},(err,data) => 
{err? console.log(err): console.log(data)})

//Perform Classic Updates by Running Find, Edit, then Save

person.findById({_id: "632337fa7fb4c514b3aff9ab"}),(err,data) => 
{if(err) 
  {console.log(err)}
 else 
  {data.favoriteFoods.push('Hamburger'),
         data.save()}
          }

//Perform New Updates on a Document Using model.findOneAndUpdate()

person.findOneAndUpdate(
    {
      name: 'fet7iz'  // search query
    }, 
    {
      age: 20   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })

//Delete One Document Using model.findByIdAndRemove

person.findOneAndRemove({
  
_id:
("632350163e922da7ed4f4eff")
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })


//MongoDB and Mongoose - Delete Many Documents with model.remove()

const Pperson=new person({
  name: 'mary',
  age: 20,
  favoriteFoods: ['koskssi','kafteji'],
})
Pperson.save().then((el)=>console.log(el)).catch((err)=>console.log(err));
const Personn=new person({
  name: 'mary',
  age: 35,
  favoriteFoods: ['kafteji'],
})
Personn.save().then((el)=>console.log(el)).catch((err)=>console.log(err));
const Persone=new person({
  name: 'mary',
  age: 1,
  favoriteFoods: [],
})
Persone.save().then((el)=>console.log(el)).catch((err)=>console.log(err));

//delete the person called mary from the database

person.remove({
  
  name:'mary'
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.error(err)
    })

//Chain Search Query Helpers to Narrow Search Results

person
.find({favoriteFoods: "broudou"})
.sort("name")
.limit(2)
.select({age:0})
.exec((err, data) => {err? Console.log(err) : console.log(data)})




app.get('*',(req, res)=>{ res.end('<h1>Hello To The Single Page Of Souhaib Salem</h1>'); });

app.listen(port, ()=> {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s', port);
  });