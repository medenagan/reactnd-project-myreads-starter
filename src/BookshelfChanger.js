import React from "react";
import {dromedaryToPrettyCase} from "./utils";

const BookshelfChanger = (props) => {

  const {book, shelves} = props;
  const {handleUpdateBook} = props;

  const otherShelves = shelves.filter(
    shelf => shelf.toLowerCase().replace(/\s/g, "") !== book.shelf.toLowerCase()
  );

  return (
    <div className="book-shelf-changer">
      <select defaultValue="move" onChange={e => handleUpdateBook(book, e.target.value)}>
        <option value="move" disabled>Move to...</option>
        {
          otherShelves.map(shelf => (
            <option
              key={shelf}
              value={shelf}>
              {dromedaryToPrettyCase(shelf)}
            </option>)
          )
        }
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookshelfChanger;
