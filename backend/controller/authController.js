const User = require('../models/user.model')
const bcrypt = require('bcryptjs');  // For hashing passwords
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must contain at least 4 characters." });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Password validation (you can also add more rules here if needed)
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters." });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,  // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ message: "User registered successfully", User: newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during registration. Please try again later." });
    }
}



const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password." });
        }

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email." });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // If the credentials are valid, create a JWT token
        const token = jwt.sign({ userId: user._id,username: user.username }, JWT_SECRET, { expiresIn: '5d' });

        // Return success response along with the JWT token
        return res.status(200).json({ message: "Login successful",userId: user._id, token:token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during login. Please try again later." });
    }
}

module.exports = {Signup,Login}