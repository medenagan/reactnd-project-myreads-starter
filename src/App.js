import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
// Import components
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import ErrorLabel from "./ErrorLabel";
import {Route, Switch} from "react-router-dom";
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

		return (
      <div className="app">

        <Switch>

          <Route exact path="/search" render= {() => (
            <SearchBooks
              books={books}
              shelves={shelves}
              error={error}
              handleUpdateBook={this.updateBook}
            />
          )}/>

          <Route exact path="/" render= {() => (
            <ListBooks
              books={books}
              shelves={shelves}
              error={error}
              handleUpdateBook={this.updateBook}
            />
          )}/>

        <Route render= {(x) => (
          <ErrorLabel error="404 Can't find this page" />
        )}/>

        </Switch>
      </div>
    );
	}
}

export default BooksApp
