const jwt = require('jsonwebtoken');
const { Customer, Admin } = require('../models/Prosche_Schema');
require('express-async-errors');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ msg: "Email and password fields are required" });
    }

    let role = 'customer';
    let userID = null;

    const admin = await Admin.findOne({ email: email });
    if (admin && password == admin.password) {
        role = 'admin';
        userID = admin._id;
    } else {
        const customer = await Customer.findOne({ email: email });
        if (!customer || !(password == customer.password)) {

           return  res.status(401).json({ msg: "Invalid username or password" });
        }
        userID = customer._id;

    }
    const token = jwt.sign({ userID, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ token: token, role: role });
};


function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email is empty or doesn't contain '@'
    if (!email || !name || !password) {
        return res.status(400).json({ msg: 'Missing values in the body' });
    }

    if(!isValidEmail(email)){
        return res.status(400).json({msg: 'invalid email format'})
    }

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
        return res.status(400).json({ msg: 'Email already exists' });
    }

    try {
        const newCustomer = new Customer({
            name,
            email,
            password
        });

        await newCustomer.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { login, register };
