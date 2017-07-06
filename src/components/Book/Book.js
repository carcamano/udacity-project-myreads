/**
 * Created by Felipe on 04/07/2017.
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired ,
		hideNoneShelf: PropTypes.bool ,
		onMoveToShelf: PropTypes.func.isRequired
	};

	render() {
		const { book } = this.props;
		const bgUrl = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : '';
		const hideNone = this.props.hideNoneShelf ? this.props.hideNoneShelf : false;

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128 ,
						height: 193 ,
						backgroundImage: `url(${bgUrl})`
					}}></div>
					<div className="book-shelf-changer">
						<select
							onChange={( event ) => this.props.onMoveToShelf( book , event.target.value )}
							value={book.shelf}
						>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							{!hideNone &&
							<option value="none">None</option>
							}
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{Array.isArray( book.authors ) ? book.authors.join( ', ' ) : ''}</div>
			</div>
		);
	}

}

export default Book;