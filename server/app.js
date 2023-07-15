const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt')

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.get("/about", (req, res) => {
  res.send("Hello, We are just starting...");
})

app.get("/problemset", (req, res) => {

})
app.get("/help", (req, res) => {

})
async function createUser(username, password, res) {
    try {
        var user = await User.findOne({ where: { username } });
        if (user) {
        console.log('User exists:', user.toJSON());
        res.status(409).send("User already exists")
        } 
        else {
            console.log('User does not exist');
            user = await User.create({ username, password });
            console.log('User created successfully:', user.toJSON());
            res.status(200).send("User Created Successfully")
        }
    }
    catch(ex){
        console.log(ex);
    }
  }

app.post("/signup", (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    console.log(password);

     // Validate the user's input.
    if (!username || !password) {
    res.status(400).send('Please provide all required fields.');
    return;
    }

    // Hash the user's password.
    const hashedPassword = bcrypt.hashSync(password, 10);

    createUser(username, hashedPassword, res);
    
})
app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});