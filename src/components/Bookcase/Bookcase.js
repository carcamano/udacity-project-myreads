/**
 * Created by Felipe on 04/07/2017.
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types'

import Shelf from '../Shelf/Shelf';

class Bookcase extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired ,
		onMoveToShelf: PropTypes.func.isRequired
	};

	shelves = [ 'currentlyReading' , 'wantToRead' , 'read' ];
	shelvesTitles = {
		currentlyReading: 'Currently Reading' ,
		wantToRead: 'Want To Read' ,
		read: 'Read'
	};

	render() {
		const books = this.props.books;
		return (
			<div>
				{this.shelves
					.map( shelfType =>
						<Shelf
							key={shelfType}
							title={this.shelvesTitles[ shelfType ]}
							books={books.filter( book => book.shelf === shelfType )}
							onMoveToShelf={this.props.onMoveToShelf}
						/>
					)}
			</div>
		);
	}

}

export default Bookcase;