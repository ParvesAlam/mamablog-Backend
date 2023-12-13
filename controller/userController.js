const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Create User
const createUser = async (req, res) => {
  const {firstName, lastName, email, password } = req.body;
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Please upload an imgage' });
  }
  try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // Create a new user
        const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        img: `http://localhost:8000/${req.file.path}`,
        });

        // Save the user to the database
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

        // Return the token as a response
        res.status(200).json({ token });
        }else{
            res.status(400).json({ message: 'Email already exists' });
        }
    
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Route to get user details based on token
const getUser = async (req, res) => {

    try {
      const userId = req.user.userId; // Assuming the user ID is stored in the token payload
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Return user details
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error finding user.' });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // If email and password are correct, create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: '10h', // Token expires in 1 hour (you can change this)
      });
      
      if (token) {
        res.status(200).json({ token, user });
      }
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
};




module.exports = {
  createUser,
  loginUser,
  getUser,

};
