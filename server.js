// import pack
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// firebase admin setup 
var serviceAccount = require("./ttcs-ecd84-firebase-adminsdk-zoqih-02deeabd91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
// declare static 
let staticPath = path.join(__dirname,"public");
//
const app = express();
// middlewares
app.use(express.static(staticPath));
app.use(express.json());
// routes
//home routes
app.get("/", (req,res)=>{
    res.sendFile(path.join(staticPath,"index.html"));
})
// login 
app.get('/login', (req,res) =>{
    res.sendFile(path.join(staticPath, "login.html"));
})
app.post('/login', (req,res) => {
    let { email , password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert':'fill all'});
    }
    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){ // if email does not exits
            return res.json({'alert': 'log in email does not exits'})
        }else{
            bcrypt.compare(password, user.data().password, (err, result)=>{
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }else{
                    return res.json({'alert': 'password in incorrect'});
                }
            })
        }
    })
})
// sign up
app.get('/signup',(req,res)=>{

    res.sendFile(path.join(staticPath, "signup.html"));
})
app.post('/signup',(req,res)=>{
    let {name, email, password, number, tac, notification } = req.body;

    if(name.length <3 ){
        return res.json({'alert' : 'name must be 3 letters long'});
    }else if(!email.length){
        return res.json({'alert': 'enter your email'});
    }else if(password.length < 8){
        return res.json({'alert':'password should be 8 letters long'});
    }else if(!number.length){
        return res.json({'alert' : 'enter your phone number'});
    }else if(!Number(number) || number.length < 10){
        return res.json({'alert' : 'invalid number'});
    }else if(!tac){
        return res.json({'alert':'you must agree to our terms'});
    }
    //store user
    db.collection('users').doc(email).get()
    .then(user =>{
        if(user.exists){
            return res.json({'alert' : 'email already exists'});
        }else{
            // encrypt the password
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt,(err, hash) =>{
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data =>{
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller,
                        })
                    })
                })
            })
        }
      })
  
})
//product
app.get('/ukiyo',(req,res)=>{
    res.sendFile(path.join(staticPath, "Ukiyo.html"));
})
app.get('/mabu',(req,res)=>{
    res.sendFile(path.join(staticPath, "mabu.html"));
})
app.get('/meat',(req,res)=>{
    res.sendFile(path.join(staticPath, "meatzero.html"));
})
app.get('/mup',(req,res)=>{
    res.sendFile(path.join(staticPath, "mupsres.html"));
})
app.get('/drink',(req,res)=>{
    res.sendFile(path.join(staticPath, "ddrinks.html"));
})
app.get('/sanji',(req,res)=>{
    res.sendFile(path.join(staticPath, "Sanji.html"));
})
//cart
app.get('/cart',(req,res)=>{
    res.sendFile(path.join(staticPath, "cart.html"));
})
//about
app.get('/about',(req,res)=>{
    res.sendFile(path.join(staticPath, "about.html"));
})
// 404
app.get('/404',(req,res)=>{
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req,res)=>{
    res.redirect('/404');
})
app.listen(3000,()=>{
    console.log('listening on port 3000.......');
})