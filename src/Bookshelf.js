import React from "react";
import Book from "./Book";

const Bookshelf = (props) => {
  const {books, category} = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books
                .filter(book => book.shelf.toLowerCase() === category.toLowerCase().replace(/\s/g, ""))
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
