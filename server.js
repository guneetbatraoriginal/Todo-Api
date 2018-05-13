var {mongoose} = require('./db/mongoose');
var {User} = require('./db/models/users');
var {Todo} = require('./db/models/todos');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var port = process.env.PORT || 3000;


var express = require('express');

var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.post("/todos",(req,res) => {
  var todo = new Todo(req.body);
  todo.save().then((doc) => {
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  })
});

server.get("/todos", (req,res) => {
  Todo.find().then((todos)=>{
    res.send(todos);
  },(e) => {
    res.status(400).send(e);
  })
});

server.get("/todos/:id", (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.send('Invalid input');
  }
  Todo.findById(id, (err,todo)=> {
    if(err){
      return res.send(err);
    }
    if(todo){
      return res.send(todo);
    }else{
      return res.status(404).send();
    }
  })
})

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
// user.save().then((doc) => {
//    console.log('User saved:', doc)
// },(e) => {
//    console.log('Unable to save user', e)
// });
