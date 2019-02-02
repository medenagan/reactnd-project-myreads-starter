import React from "react";
import Bookshelf from "./Bookshelf";

const ListBooks = (props) => {
  const {books, categories} = props;
  const {setShowSearchPage} = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {
          // ["currently reading, want to read, and read"]
          categories.map(category => <Bookshelf books={books} category={category} key={category} />)
        }
      </div>
      <div className="open-search">
        <button onClick={() => setShowSearchPage(true)}>Add a book</button>
      </div>
    </div>
  );
};

export default ListBooks;
