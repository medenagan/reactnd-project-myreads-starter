import React from "react";
import Bookshelf from "./Bookshelf";

const ListBooks = (props) => {
  const {books, shelves} = props;
  const {handleSetShowSearchPage, handleUpdateBook} = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {
          shelves.map(shelf => (
            <Bookshelf
              key={shelf}
              shelf={shelf}
              books={books}
              shelves={shelves}
              handleUpdateBook={handleUpdateBook}
            />
          ))
        }
      </div>
      <div className="open-search">
        <button onClick={() => handleSetShowSearchPage(true)}>Add a book</button>
      </div>
    </div>
  );
};

export default ListBooks;
