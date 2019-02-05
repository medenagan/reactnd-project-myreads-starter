import React, {Component} from "react";
import {Link} from "react-router-dom";
import ErrorLabel from "./ErrorLabel";
import BookGrid from "./BookGrid";
import * as db from "./BooksAPI";

class SearchBooks extends Component {

  state = {
    query: "",
    searchBooks: [],
    searchError: false
  };

  updateQuery = query => {
    this.setState(

      {query}, // Set the query for input

      () => {

        const {localBooks} = this.props;

        // Once state is updated with the new query, inquire database
        const trimmedQuery = query.replace(/\s+/, " ").trim();

        if (! trimmedQuery.length) {
          this.updateResults(query, []);
        }

        else {
          db.search(trimmedQuery).then(

            value => {

              if (Array.isArray(value)) {
                // Find if returned books are stored locally
                // and set their shelf in this case
                value.forEach(
                  anyDbBook => anyDbBook.shelf = (
                    localBooks.find(anyLocalBook => anyLocalBook.id === anyDbBook.id) || {shelf: ""}
                  ).shelf
                );

                this.updateResults(query, value);
              }

              else if (typeof value !== "object") {
                this.updateResults(query, [], "db.Update() type mismatch");
              }

              else if (value.error === "empty query") {
                this.updateResults(query, []);
              }

              else  {
                this.updateResults(query, [], value.error || "Generic Error");
              }
            },

            reason => {
              this.updateResults(query, [], reason || "Generic Error");
            }

          );
        }

      }
    );
  }

  updateResults = (originalQuery, dbBooks, dbError) => {
    // Ignore late results for a query already being updated
    if (this.state.query !== originalQuery) {
      return;
    }

    this.setState({
      searchBooks: dbError ? [] : dbBooks,
      searchError: dbError
    });
  }

  render () {

    const {query, searchBooks, searchError} = this.state;
    const {localBooks, shelves, handleUpdateBook} = this.props;

    const suggestedQuery = [
      'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
      'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
      'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
      'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama',
      'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
      'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
      'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri',
      'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez',
      'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography',
      'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River',
      'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
      'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
      'Virtual Reality', 'Web Development', 'iOS'].join(", ");

    return (

      <div className = "search-books">
        <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
          }
          <input
            type="text"
            value={query}
            onChange={e => this.updateQuery(e.target.value)}
            placeholder="Search by title or author"
            title = {suggestedQuery}
          />
        </div>
      </div>

      <div className="search-books-results">
        <div>Found {searchBooks.length} book{searchBooks.length !== 1 && "s"}</div>
        <ErrorLabel error={searchError}/>
        <BookGrid
          books={searchBooks}
          shelves={shelves}
          handleUpdateBook={handleUpdateBook}
        />

{/*
        <ListBooks
          books={books}
          shelves={shelves}
          error={error}
          handleUpdateBook={handleUpdateBook}
        />
        */ }
      </div>
      </div>
    );
  }
}

export default SearchBooks;
