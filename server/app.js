const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.get("/about", (req, res) => {
  res.send("Hello, We are just starting...");
})

app.get("/problemset",authenticateToken, (req, res) => {

})
app.get("/submissions",authenticateToken, (req, res) => {
  res.json({'problem1':""});
})
app.get("/help", (req, res) => {

})
app.post("/login", async (req, res) => {
    const {username, password} = req.body;

     try{
     var user = await User.findOne({ where: { username } })

     const passwordMatch = await bcrypt.compare(password, user.password);

     if (!user || !passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

     console.log('User Logged In successfully:', user.toJSON());
     // Create JWT token
     const token = jwt.sign({ userId: user.username }, 'your_secret_key_here', { expiresIn: '1h' });
     //TODO: Handle secret key
     return res.set('Authorization', `Bearer ${token}`).json({ message: 'Login successful' });

    }
    catch(ex){
        console.error('Error during login:', ex);
        return res.status(500).json({ error: 'Internal server error' });
    }
   

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