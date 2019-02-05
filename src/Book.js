import React from "react";
import BookshelfChanger from "./BookshelfChanger";

const Book = (props) => {
  const {book, shelves} = props;
  const {handleUpdateBook} = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          title={`${"☆".repeat(book.averageRating)} ${(book.description || "").split(/\s+/).slice(0, 7).join(" ")}...`}
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")`
          }}>
        </div>
        <BookshelfChanger
          book={book}
          shelves={shelves}
          handleUpdateBook={handleUpdateBook}
        />
      </div>
      <div className="book-title">{book.title || "[No Title]"}</div>
      <div className="book-authors">{(book.authors || ["Various"]).join(", ")}</div>
    </div>
  );
};

export default Book;
