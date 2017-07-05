/**
 * Created by Felipe on 04/07/2017.
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types'

import Book from '../Book/Book';

class Shelf extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired ,
		books: PropTypes.array.isRequired ,
		onMoveToShelf: PropTypes.func.isRequired
	}


	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map( book =>
							<li key={book.id}>
								<Book
									key={book.id}
									book={book}
									onMoveToShelf={this.props.onMoveToShelf}
								/>
							</li>
						)}
					</ol>
				</div>
			</div>
		);
	}

}

export default Shelf