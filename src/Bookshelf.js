import React from "react";
import BookGrid from "./BookGrid";
import {dromedaryToPrettyCase} from "./utils";

const Bookshelf = (props) => {

    const {books, shelf, shelves} = props;
    const {handleUpdateBook} = props;

    const shelfBooks = books.filter(
        book => book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s/g, "")
    );

    // Hide if there are no books in this shelf
    return !!shelfBooks.length && (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{dromedaryToPrettyCase(shelf)}</h2>
            <div className="bookshelf-books">
                <BookGrid books={shelfBooks} shelves={shelves} handleUpdateBook={handleUpdateBook}/>
            </div>
        </div>
    );
};

export default Bookshelf;
