import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
// Import components
import ListBooks from "./ListBooks";
// Import all stuff from mock database API
import * as db from "./BooksAPI";

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    db.getAll().then(
      value => this.setState({books: value}),
      reason => {
        // TODO: real app should have proper error handling
        this.setState({books: []});
        console.error("Can't get book records", reason);
      }
    );
  }

  setShowSearchPage = (value) => this.setState({ showSearchPage: value });

  render() {
    const {books} = this.state;
    const categories = ["currently reading", "want to read", "read"];
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (<ListBooks books={books} categories={categories} setShowSearchPage={this.setShowSearchPage}/>)}
      </div>
    )
  }
}

export default BooksApp
