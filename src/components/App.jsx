import { useState } from 'react';

import { searchArtworks } from '../api';

import { Footer } from './Footer';
import { SearchForm } from './SearchForm';

import './App.css';

export function App() {
	const [results, setResults] = useState([]); // Initializ a state variable to to an empty array which will hold the fetch artwork data
	function onSearchSubmit(query) {
		// Search for the users's query.
		searchArtworks(query)
			.then((json) => {
				console.log(json);
				setResults(json.data); //update results state with the fetch data
			})
			.catch((error) => {
				console.error('Error fetching artworks:', error);
				setResults([]); //clear results on error
			});
	}
	// TODO: render the results, instead of logging them to the console.
	// NOTE: `searchArtworks` currently returns local data, so that we
	// don't make too many requests to the API! Once we've built out
	// our UI, we need to make real requests!
	// @see: ./src/api.js

	//Rendering the results
	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			<div className="results">
				{results.length > 0 ? (
					<ul>
						{results.map((artwork) => (
							<li key={artwork.image_id}>
								<strong>{artwork.title}</strong> by {artwork.artist_title}
							</li>
						))}
					</ul>
				) : (
					<p>No results found. Please try another search.</p>
				)}
			</div>
			<Footer />
		</div>
	);
}
