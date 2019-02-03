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
		books: [],
		error: false
	}

	get shelves() {
		return ["currentlyReading", "wantToRead", "read"];
	}

	componentDidMount() {
		db.getAll().then(
      value => this.setState({books: value, error: false}),
      reason => this.setState({books: [], error: reason || true})
    );
	}

	setShowSearchPage = (value) => this.setState({showSearchPage: value});

	updateBook = (book, toShelf) => {
		db.update(book, toShelf).then(dbResult => {

			if (dbResult.error) {
				alert(dbResult.error);
				return;
			}

			this.setState(prevState => {
				// Create a copy of books where to clear the shelf reference
				const books = prevState.books.map(book => Object.assign({}, book, {shelf: ""}));

				// Reset shelf on each book {currentlyReading: ["sJf1vQAACAAJ"], ...}
				this.shelves.forEach(shelf => dbResult[shelf].forEach(id => (books.find(book => book.id === id) || {
					shouldntBeHere: true
				}).shelf = shelf));

				// Don't alter original state object here
				return Object.assign({}, prevState, {books});
			});

		});
	}

	render() {
		console.log("RENDER", this.state)
		const {books, error} = this.state;
		const {shelves} = this;
		return (<div className="app">
			{
				this.state.showSearchPage
					? (<div className="search-books">
						<div className="search-books-bar">
							<button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
							<div className="search-books-input-wrapper">
								{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
								}
								<input type="text" placeholder="Search by title or author"/>

							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>)
					: (
          <ListBooks
            books={books}
            shelves={shelves}
            error={error}
            handleSetShowSearchPage={this.setShowSearchPage}
            handleUpdateBook={this.updateBook}
          />)
			}
		</div>)
	}
}

export default BooksApp
