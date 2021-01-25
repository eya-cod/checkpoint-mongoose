let mongoose = require('mongoose');
const mongoDB = require('mongodb');
let MONGO_URI="mongodb+srv://eya:1010@cluster0.mwzfm.mongodb.net/checkpointMongoose?retryWrites=true&w=majority"
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    
      .then(() => {
          console.log('Database connection successful')
        })
    .catch(err => {
        console.error('Database connection error')
        })

//  Create a person having this prototype:

const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  age: Number ,
  favoriteFoods: [String]
});

  const Person = mongoose.model("Person", personSchema);

 //  Create and Save a Record of a Model:

  var createAndSavePerson = function(done) {
  const person = new Person({
    name: 'eya', 
    age: 30, 
  favoriteFoods: ['apple','orange']
  });

  person.save((err, data) => {
    console.log(data);
    if(err) {
      done(err);
    }
    
    done(null, data);
  })
};

// Create Many Records with model.create()

var createManyPeople = function (arrayOfPeople, done) {
    Person.create(arrayOfPeople,function(err, data) {
      if(err) return done(err);
      return done(null, data);
    });  
  };

//  Use model.find() to Search Your Database

var findPeopleByName = function(personName, done) {
  return Person.find({name: personName}).then(function(err,data){
      done(null, data);
  })
};

//  Use model.findOne() to Return a Single Matching Document from Your Database

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if(err) return done(err);
    return done(null, data);
  });  
};

// Use model.findById() to Search Your Database By _id


var findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data)); 
};

//  Perform Classic Updates by Running Find, Edit, then Save

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function(err, data) {
    this.favoriteFoods.push(foodToAdd).save();
    if (err) {
      return done(err);
    }
    else {
      done(null, data);
    }
  });
};

//  Perform New Updates on a Document Using model.findOneAndUpdate()

var findAndUpdate = function(personName, doc) {
  var ageToSet = 20;
  
  Person.findOneAndUpdate(
    {"name": personName},
    {$set: {"age":ageToSet}},
    {new : true},
    function(err,done){
      if(err){
        console.log("Error Ocurred")
      }
      console.log(done)
    }    
)};

//  Delete One Document Using model.findByIdAndRemove


var findByIdAndRemove = (personId, done) => {
  Person.findOneAndRemove(personId, (err, data) => err ? done(err) : done(null, data)); 
};

//  MongoDB and Mongoose - Delete Many Documents with model.remove()

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => done(null, data));
};

//  Chain Search Query Helpers to Narrow Search Results

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name : 1}).limit(2).select("-age").exec((err, data) => {
     if(err)
       done(err);
    done(null, data);
  })
};

