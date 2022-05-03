
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 8000; 

app.engine('handlebars', exphbs());
app.set('views', (__dirname + '/views')); 
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


//SERVER
app.listen(port, () => {
  console.log(`app is listening to PORT ${port}`)
});

//INDEX

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
  next();
});



//SEARCH

const fetch = require("node-fetch");

const API_URL = 'https://reststop.randomhouse.com/resources/titles';

/********************* anazhthsh me keyword apo to APi */
app.post('/search', function(req, res, next) {
    const keyword = req.body.keyword;
    /** upload apotelesmata search */
    fetch(API_URL+'/?search='+keyword , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        }
    }
      )
    .then(
        (response) => response.json()
    ).then(
     
        json=> {
            res.render('list', { title: 'Search', results :  json.title});
        }
    )   
    .catch(
        error => console.log(error)
    );
   
});





//DIAXEIRISH LISTAS AGAPHMENWN
let books = require(__dirname + '/model/favorBook');
let favorBook = books.favorBook;

let mybooks = []

//ADD 
app.post('/add', function(req, res) {

let bookToAdd = new favorBook(req.body.title,req.body.author,req.body.workid,req.body.review);

let exists = false ;

for (i = 0; i < mybooks.length; i++) {

    if( mybooks[i].getWorkid == bookToAdd.getWorkid &&( mybooks[i].getTitle==bookToAdd.getTitle ) ){
       exists = true;
    }
  } 

  if(exists){
    res.json({msg : 'exist'});
  }
  else {
    mybooks.push(bookToAdd); 
    res.json({msg : 'Ok'});
  }
  
})

//LIST

app.get('/list', function(req, res) {

    res.render('favorlist', {lists : mybooks, title : 'Favorite List'})
    })
    
// DELETE

app.post('/deletebook', function(req, res, next) {

    for (i = 0; i < mybooks.length; i++) {
        if(mybooks[i].getWorkid == req.body.workid){
            mybooks.splice(i, 1);  
        }
    }

    res.json({msg : 'deleted'});
})

//FILTER
app.post('/filter', function(req, res) {

let flist = [] ;
let filtered ;
let key = (req.body.keyword).toUpperCase();

for (i = 0; i < mybooks.length; i++) {
    if( ( (mybooks[i].getWorkid)==(key) ) || ( (mybooks[i].getAuthor).includes(key) ) || ( (mybooks[i].getTitle).includes(key) ) ){
        filtered =mybooks[i];
        flist.push(filtered);
  };
  
};
res.render('favorlist', {lists : flist, title : 'Favorite List'});
})


//EDIT 
app.post('/edit', function(req, res) {

    let bookToedit;
    for (i = 0; i < mybooks.length; i++) {
        if(mybooks[i].getWorkid == req.body.workid){
            bookToedit = mybooks[i];
        };
    };
    res.render('favoredit', {title : 'Favorite Edit', result : bookToedit});

})

//UPADATE
app.post('/update', function(req, res) {
    
    for (i = 0; i < mybooks.length; i++) {
        if(mybooks[i].getWorkid == req.body.workid){
           mybooks[i].setReview = req.body.review;
           mybooks[i].setAuthor = req.body.author;
           mybooks[i].setTitle = req.body.title;
        };
    };
    res.render('favorlist', {lists : mybooks, title : 'Favorite List'})
 })

module.exports = app;























































