const express = require('express');
let books = require("./booksdb.js");
let { isValid } = require("./auth_users.js");
let { users } = require("./users.js");
const public_users = express.Router();
let { getBooksAsync, getBookByISBNAsync } = require("./booksdb.js");


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username && password) {
        if(!isValid(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered"});
        } else {
            return res.status(404).json({message: "User already exists"});
        }
    }

    return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) { 
    try {
        const bookList = await getBooksAsync();
        return res.status(200).json(bookList); 
    } catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function(req, res) {
    const isbn = req.params.isbn;
    try {
        const book = await getBookByISBNAsync(isbn);
        return res.status(200).json(book);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const requestedAuthor = req.params.author;
    const foundBooks = [];

    for(const isbn in books) {
        if(books[isbn].author === requestedAuthor) {
            foundBooks.push({ isbn: isbn, ...books[isbn] }); // spread syntax
        }
    }

    if(foundBooks.length > 0) {
        return res.status(200).json({ booksbyauthor: foundBooks });
    } else {
        return res.status(404).json({ message: `No books found by author ${requestedAuthor}` });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const requestedTitle = req.params.title;
    const foundBooks = [];

    for(const isbn in books) {
        // Checking if 'title' exists before using toLowerCase()
        if (books[isbn].title && 
            books[isbn].title.toLowerCase().includes(requestedTitle.toLowerCase())) {
            
            foundBooks.push({ isbn: isbn, ...books[isbn]});
        }
    }
    
    if(foundBooks.length > 0) {
        return res.status(200).json({ booksbytitle: foundBooks });
    } else {
        return res.status(404).json({ message: `No books found with title containing: ${requestedTitle}` });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const  isbn = req.params.isbn;

    if(books[isbn]) {
        if(books[isbn].reviews) {
            return res.status(200).json({ 
                isbn: isbn,
                reviews: books[isbn].reviews
            });
        } else {
            return res.status(200).json({ message: `Book with ISBN ${isbn} found, but no reviews available` });
        }
    } else {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }
});

module.exports.general = public_users;
