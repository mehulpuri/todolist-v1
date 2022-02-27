const express = require("express");
const bodyParser= require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
let items=["Buy Food", "Cook food", "Eat food"];
let workItems = [];
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", function(req,res){
  let day =date.getDate();
  res.render("list", {
    listTitle : day,
    newListItem: items
});
});

app.get("/work" , function(req,res){
  res.render("list", {
    listTitle:"Work List",
    newListItem: workItems
  });
});

app.post("/work", function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.post("/", function(req,res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

const PORT = process.env.PORT || '3000';
app.listen(PORT, function(){
  console.log("the server is up and running");
});



// var currentDay =today.getDay();
// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// let day = days[today.getDay()];
