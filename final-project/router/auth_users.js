const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let { users } = require("./users.js");

const isValid = (username)=>{ //returns boolean
    let userwithsamename = users.filter((user) => {
        return user.username === username;
    });

    if (userwithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validuser = users.filter((user) => {
        return(user.username === username && user.password === password);
    });

    if(validuser.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
  
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            username: username
        }, 'super_long_and_secret_key_for_jwt', {expiresIn: 60 * 60 });
  
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    if(!books[isbn]) {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found.` });
    }
    if(!review) {
        return res.status(400).json({ message: "Review content can not be empty" });
    }

    if(!books[isbn].reviews) {
        books[isbn].reviews = {};
    }


    books[isbn].reviews[username] = review;

    return res.status(200).json({
        message: `Review for ISBN ${isbn} by user ${username} added/updated successfully.`,
    });
});

// delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    //check if the list exists
    if(!books[isbn]) {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }

    // check user's review exists
    if(books[isbn].reviews && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];

        return res.status(200).json({
            message: `Review by user ${username} for ISBN ${isbn} successfully delete`
        });
    } else {
        // get a callback when user has no review to delete
        return res.status(404).json({
            message: `Review by user${username} for ISBN ${isbn} not found to delete`
        });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;

