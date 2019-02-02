import React from "react";
import Book from "./Book";

const Bookshelf = (props) => {
  const {books, shelf} = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books
                .filter(book => book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s/g, ""))
                .map(book => (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                ))
            }
          </ol>
        </div>
    </div>
  );
};

export default Bookshelf;
