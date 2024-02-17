const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

const test = (req, res) => {
    res.json('test is working')
};

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if name is entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            });
        }
        // Check if password is valid
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        }
        // Check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password);
        // Create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        });

        return res.json(user);

    } catch (error) {
        console.log(error);
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check if users exist
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }
        // Check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            res.json('Passwords match');
        } else {
            return res.json({
                error: 'Incorrect password'
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
};