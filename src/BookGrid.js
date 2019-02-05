import React from "react";
import Book from "./Book";

const BookGrid = (props) => {

    const {books, shelves} = props;
    const {handleUpdateBook} = props;

    return (
        <ol className="books-grid">
            {
                books.map(book => (
                    <li key={book.id}>
                        <Book
                            book={book}
                            shelves={shelves}
                            handleUpdateBook={handleUpdateBook}
                        />
                    </li>
                ))
            }
        </ol>
    );
};

export default BookGrid;
