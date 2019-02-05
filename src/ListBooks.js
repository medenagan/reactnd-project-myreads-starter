import React from "react";
import Bookshelf from "./Bookshelf";
import ErrorLabel from "./ErrorLabel";
import OpenSearch from "./OpenSearch";

const ListBooks = (props) => {
    const {books, shelves, error} = props;
    const {handleUpdateBook} = props;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <ErrorLabel error={error} />
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
            <OpenSearch />
        </div>
    );
};

export default ListBooks;
