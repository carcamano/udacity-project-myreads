/**
 * Created by Felipe on 04/07/2017.
 */
import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import * as BooksAPI from '../../services/BooksAPI';
import Book from '../../components/Book/Book';

class SearchScene extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired ,
		onMoveToShelf: PropTypes.func.isRequired
	}

	state = {
		myBookIds: [] ,
		result: [] ,
	};

	timeout = null;

	/**
	 * @description Search for a book on Udacity BookAPI and populate state.result
	 * @param {query} string - Part of book title or author
	 */
	search = ( query ) => {
		clearTimeout( this.timeout );
		this.timeout = setTimeout( () => {
			if ( query !== '' ) {
				BooksAPI.search( query , 50 ).then( result => this.setState( { result } ) );
			} else {
				this.setState( { result: [] } );
			}
		} , 300 );
	};

	/**
	 * @description Move a book from a shelf to another
	 * @param {object} book - The book itself
	 * @param {string} shelf - The destination shelf, should be one of: 'currentlyReading' , 'wantToRead' or 'read'
	 */
	moveToShelf = ( book , shelf ) => {
		this.setState( ( state ) => ({ myBookIds: state.myBookIds.concat( [ book.id ] ) }) );
		this.props.onMoveToShelf( book , shelf );
	};

	componentDidMount() {
		this.setState( { myBookIds: this.props.books.map( book => book.id ) } );
		document.getElementById( 'queryImput' ).focus();
	}

	render() {
		const result = this.state.result.error
			? []
			: this.state.result.filter( book => this.state.myBookIds.indexOf( book.id ) === -1 );

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
						       id="queryImput"
						       onChange={( event ) => this.search( event.target.value )}
						       placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{result.map( book => (
							<li key={book.id}>
								<Book
									key={book.id}
									book={book}
									hideNoneShelf={true}
									onMoveToShelf={this.moveToShelf}
								/>
							</li>
						) )
						}
					</ol>
				</div>
			</div>
		);
	}

}

export default SearchScene