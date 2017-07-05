/**
 * Created by Felipe on 04/07/2017.
 */

import React , { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookcase from '../../components/Bookcase/Bookcase';

class HomeScene extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onMoveToShelf: PropTypes.func.isRequired
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<Bookcase
						books={this.props.books}
						onMoveToShelf={this.props.onMoveToShelf}
					/>
				</div>

				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}

}

export default HomeScene
