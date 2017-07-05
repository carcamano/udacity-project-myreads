import React , { Component } from 'react';
import { Route } from 'react-router-dom'

import * as BooksAPI from './services/BooksAPI';
import './App.css'

import HomeScene from './scenes/Home/Home';
import SearchScene from './scenes/Search/Search';

class BooksApp extends Component {
	state = {
		books: []
	};

	moveToShelf = ( book , shelf ) => {
		BooksAPI.update( book , shelf ).then( () => {
			if ( shelf === 'none' ) {
				this.setState(
					( state ) => ({
						books: state.books.filter( bf => book.id !== bf.id )
					})
				);
			} else {
				book.shelf = shelf;
				this.setState(
					( state ) => ({
						books: state.books
							.filter( bf => book.id !== bf.id )
							.concat( [ book ] )
					})
				);
			}
		} )
	};

	componentDidMount() {
		BooksAPI.getAll()
			.then( books => {
				this.setState( { books: books } );
				// console.log(this.state);
			} )
	}

	render() {
		return (
			<div className="app">

				<Route exact path='/' render={ () =>
					<HomeScene
						books={this.state.books}
						onMoveToShelf={this.moveToShelf}
					/>}
				/>

				<Route path='/search' render={() =>
					<SearchScene
						books={this.state.books}
						onMoveToShelf={this.moveToShelf}
					/>}
				/>

			</div>
		);
	}
}

export default BooksApp
