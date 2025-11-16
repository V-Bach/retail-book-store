Small project using javascript with framwork: nodejs and express

First run: *npm install for Packages installing
Then run: *npm start or *node index.js to start the server
Postman Json is attached in Project import it in your post to verify
Set environment Variable in Postman

site_url will be http://localhost:5000/


Url for Get method
#1: Get book by ISBN:  GET http://localhost:5000/customer/isbn/1
#2: Get book by author:  GET http://localhost:5000/customer/author/Jane Austen
#3: Get book by review:  GET http://localhost:5000/customer/review/1
#4: Get book by title:  GET http://localhost:5000/customer/title/pride  


Url for authentication
#1: register:  POST http://localhost:5000/customer/register
    body->Json
    {
        "username": "test",
        "password": "123"
    }
#2: login:  POST http://localhost:5000/customer/login  (using the json last registered)
#3: add review:  PUT http://localhost:5000/customer/auth/review/<isbn-number>?review=<Reviews>
#4: delete review:  DELETE http://localhost:5000/customer/auth/review/1




