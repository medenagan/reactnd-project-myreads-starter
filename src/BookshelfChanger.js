import React from "react";
import {dromedaryToPrettyCase} from "./utils";

const BookshelfChanger = (props) => {

  const {book, shelves} = props;
  const {handleUpdateBook} = props;

  const NON_BREAKING_SPACE = String.fromCharCode(160);
  const BLANK = NON_BREAKING_SPACE.repeat(4);
  const CHECKED = "🗸" + NON_BREAKING_SPACE;

  // Add a none category
  if (shelves.indexOf("none") === -1) {
    shelves.push("none");
  }

  return (
    <div className="book-shelf-changer">
      <select defaultValue="move" onChange={e => handleUpdateBook(book, e.target.value)}>
        <option value="move" disabled>Move to...</option>
        {
          shelves.map(shelf => {
            const isSameShelf = shelf.toLowerCase() === book.shelf.toLowerCase();
            return (
              <option key={shelf} value={shelf}>
                {(isSameShelf ? CHECKED : BLANK) + dromedaryToPrettyCase(shelf)}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

export default BookshelfChanger;
