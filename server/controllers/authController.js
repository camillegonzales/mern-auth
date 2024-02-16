const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
};

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if name is entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        };
        // Check if password is valid
        if (!password || password.length < 6) {
            return registerUser.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        // Check email
        const exist = await User.findOne({email});
        if (exist) {
            return re.json({
                error: 'Email is already connected to an account'
            })
        };

        const user = await User.create({
            name, email, password
        });

        return res.json(user);

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    test,
    registerUser
};