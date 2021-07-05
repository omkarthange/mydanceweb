const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true, useUnifiedTopology:true});
const port= 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/Contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params)
})

app.post('/Contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})