let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

module.exports=books;

// function to simulate the "getting all books"
const getBookAsync = () => {
      return new Promise((resolve, reject) => {
            setTimeout(() => {

                  resolve(books);
            }, 1000);
      });
};

// function to simulate the "get book by ISBN" using async
const getBookByISBNAsync = (isbn) => {
      return new Promise((resolve, reject) => {
            setTimeout(() => {
                  if (books[isbn]) {
                        resolve(books[isbn]);
                  } else {
                        reject(new Error(`Book with ISBN ${isbn} not found`));
                  }
            }, 1000);
      });
};

module.exports.getBookAsync = getBookAsync;
module.exports.getBookByISBNAsync = getBookByISBNAsync;
